import { useState, useRef, useEffect } from 'react';
import type { SkillTree, BuildSkill } from '../types/builds';

interface SkillTreeModalProps {
  skillTrees: SkillTree[];
  buildSkills?: BuildSkill[];
  onClose: () => void;
}

interface SkillPosition {
  skillId: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TreeNode {
  skill: any;
  level: number;
  children: TreeNode[];
  prerequisites: any[];
}

export default function SkillTreeModal({ skillTrees, buildSkills = [], onClose }: SkillTreeModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [skillPositions, setSkillPositions] = useState<Map<string, SkillPosition>>(new Map());
  const [scale, setScale] = useState(1.4);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Get all skills from all trees
  const allSkills = skillTrees.flatMap(tree => tree.skills);

  const getBuildSkill = (skillId: string) => {
    return buildSkills.find(bs => bs.skillId === skillId);
  };

  // Build tree structure and calculate levels
  const buildTreeStructure = () => {
    const skillMap = new Map(allSkills.map(s => [s.id, { skill: s, level: 0, children: [], prerequisites: [] }]));

    // Set up relationships
    allSkills.forEach(skill => {
      const node = skillMap.get(skill.id);
      if (!node) return;

      skill.prerequisites.forEach(prereq => {
        const prereqNode = skillMap.get(prereq.skillId);
        if (prereqNode) {
          prereqNode.children.push(node);
          node.prerequisites.push(prereqNode);
        }
      });
    });

    // Calculate levels (BFS from root nodes)
    const queue: TreeNode[] = [];
    skillMap.forEach(node => {
      if (node.prerequisites.length === 0) {
        node.level = 0;
        queue.push(node);
      }
    });

    while (queue.length > 0) {
      const current = queue.shift()!;
      current.children.forEach(child => {
        if (child.level === 0 || child.level <= current.level) {
          child.level = current.level + 1;
          queue.push(child);
        }
      });
    }

    return skillMap;
  };

  const treeStructure = buildTreeStructure();

  // Calculate positions for tree layout with better grouping (horizontal)
  const calculatePositions = () => {
    const positions = new Map<string, SkillPosition>();

    // Group skills by level
    const levelGroups = new Map<number, TreeNode[]>();
    treeStructure.forEach(node => {
      if (!levelGroups.has(node.level)) {
        levelGroups.set(node.level, []);
      }
      levelGroups.get(node.level)!.push(node);
    });

    const maxLevel = Math.max(...levelGroups.keys());
    const nodeWidth = 200;
    const nodeHeight = 130;
    const levelGap = 250; // Horizontal gap between levels
    const nodeGap = 20;

    // For each level, group skills by their prerequisites
    levelGroups.forEach((nodes, level) => {
      if (level === 0) {
        // Root level - just space them evenly vertically
        const totalHeight = nodes.length * nodeHeight + (nodes.length - 1) * nodeGap;
        const startY = (600 - totalHeight) / 2;

        nodes.forEach((node, index) => {
          positions.set(node.skill.id, {
            skillId: node.skill.id,
            x: level * (nodeWidth + levelGap) + 100,
            y: startY + index * (nodeHeight + nodeGap),
            width: nodeWidth,
            height: nodeHeight,
          });
        });
      } else {
        // Group by prerequisites
        const prereqGroups = new Map<string, TreeNode[]>();

        nodes.forEach(node => {
          // Create a key based on sorted prerequisite IDs
          const prereqKey = node.prerequisites
            .map(p => p.skill.id)
            .sort()
            .join('-');

          if (!prereqGroups.has(prereqKey)) {
            prereqGroups.set(prereqKey, []);
          }
          prereqGroups.get(prereqKey)!.push(node);
        });

        // Position each group
        let currentY = 50;
        prereqGroups.forEach((groupNodes) => {
          // Calculate position based on the first prerequisite's position
          if (groupNodes.length > 0 && groupNodes[0].prerequisites.length > 0) {
            const firstPrereq = groupNodes[0].prerequisites[0];
            const prereqPos = positions.get(firstPrereq.skill.id);
            if (prereqPos) {
              currentY = prereqPos.y;
            }
          }

          groupNodes.forEach((node, index) => {
            positions.set(node.skill.id, {
              skillId: node.skill.id,
              x: level * (nodeWidth + levelGap) + 100,
              y: currentY + index * (nodeHeight + nodeGap),
              width: nodeWidth,
              height: nodeHeight,
            });
          });

          // Move to next group position
          currentY += groupNodes.length * (nodeHeight + nodeGap) + 50;
        });
      }
    });

    return positions;
  };

  const positions = calculatePositions();

  // Calculate tree bounds for centering
  const calculateTreeBounds = () => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    positions.forEach(pos => {
      minX = Math.min(minX, pos.x);
      minY = Math.min(minY, pos.y);
      maxX = Math.max(maxX, pos.x + pos.width);
      maxY = Math.max(maxY, pos.y + pos.height);
    });
    return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
  };

  const treeBounds = calculateTreeBounds();

  // Calculate center position
  const calculateCenterPosition = () => {
    const containerWidth = 3000; // From minWidth
    const containerHeight = 1000; // From minHeight
    const centerX = (containerWidth - treeBounds.width) / 2 - treeBounds.minX;
    const centerY = (containerHeight - treeBounds.height) / 2 - treeBounds.minY;
    return { x: centerX, y: centerY };
  };

  // Initialize position to center
  useEffect(() => {
    const centerPos = calculateCenterPosition();
    setPosition(centerPos);
  }, []);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setScale(1.4);
    const centerPos = calculateCenterPosition();
    setPosition(centerPos);
  };

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.max(0.5, Math.min(2, prev + delta)));
  };

  // Draw connection lines (horizontal layout)
  const drawConnectionLines = () => {
    const lines: JSX.Element[] = [];

    treeStructure.forEach(node => {
      const nodePos = positions.get(node.skill.id);
      if (!nodePos) return;

      node.prerequisites.forEach(prereqNode => {
        const prereqPos = positions.get(prereqNode.skill.id);
        if (!prereqPos) return;

        // Calculate connection points (horizontal: from right of prereq icon to left of node icon)
        // Icon is 64x64 (w-16 h-16), centered within the position
        // Level is positioned at -top-4 (16px above icon), name at -bottom-4.5 (72px below icon)
        // The icon is positioned within a relative container, so we need to account for the level badge offset
        const iconSize = 64;
        const iconOffsetX = (nodePos.width - iconSize) / 2;
        const levelBadgeHeight = 32; // Level badge height (py-1 = 8px, text-sm = 20px, total ~32px)
        const iconTopOffset = levelBadgeHeight; // Icon starts after level badge

        const startX = prereqPos.x + iconOffsetX + iconSize;
        const startY = prereqPos.y + iconTopOffset + iconSize / 2;
        const endX = nodePos.x + iconOffsetX;
        const endY = nodePos.y + iconTopOffset + iconSize / 2;

        // Create curved path (horizontal)
        const midX = startX + (endX - startX) / 2;

        lines.push(
          <path
            key={`${prereqNode.skill.id}-${node.skill.id}`}
            d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
            stroke="#8b5cf6"
            strokeWidth="2"
            fill="none"
            className="opacity-60"
          />
        );
      });
    });

    return (
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        width="100%"
        height="100%"
      >
        {lines}
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl max-w-[95vw] w-full max-h-[95vh] overflow-hidden border border-slate-700">
        <div className="p-8 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">Full Skill Tree</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="px-8 py-4 border-b border-slate-700 flex items-center gap-3">
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center text-white font-bold text-lg"
          >
            −
          </button>
          <span className="text-white text-base min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center text-white font-bold text-lg"
          >
            +
          </button>
          <button
            onClick={handleResetZoom}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-white text-base"
          >
            Reset
          </button>
          <span className="text-gray-400 text-base ml-2">
            Drag to pan • Scroll to zoom
          </span>
        </div>

        {/* Skill Tree Container Box */}
        <div
          className="p-8 overflow-hidden bg-slate-900/50"
          style={{ height: 'calc(95vh - 160px)' }}
        >
          <div
            ref={containerRef}
            className="relative cursor-grab active:cursor-grabbing"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <div
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                minWidth: '3000px',
                minHeight: '1000px',
              }}
            >
              {drawConnectionLines()}
              {allSkills.map(skill => {
                const buildSkill = getBuildSkill(skill.id);
                const pos = positions.get(skill.id);
                const isPassive = skill.type === 'passive';

                if (!pos) return null;

                // Always use single line for name
                const displayName = skill.name;

                return (
                  <div
                    key={skill.id}
                    data-skill-id={skill.id}
                    className="absolute"
                    style={{
                      left: pos.x,
                      top: pos.y,
                      width: pos.width,
                      height: pos.height,
                      zIndex: 1,
                    }}
                  >
                    <div className="flex flex-col items-center">
                      {/* Single container with level, icon, and name */}
                      <div className="relative group">
                        {/* Level - positioned above the icon */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-600 rounded-lg px-3 py-1">
                          <div className="text-sm text-white font-bold">
                            {buildSkill?.level || 0}/{skill.maxLevel}
                          </div>
                        </div>
                        {/* Icon */}
                        <div className={`w-16 h-16 bg-slate-800 flex items-center justify-center ${isPassive ? 'rounded-lg' : 'rounded-full'}`}>
                          {skill.icon ? (
                            <img src={skill.icon} alt={skill.name} className="w-14 h-14" />
                          ) : (
                            <span className="text-3xl">⚡</span>
                          )}
                        </div>
                        {/* Name - positioned below the icon */}
                        <div className="absolute -bottom-4.5 left-1/2 -translate-x-1/2 bg-slate-600 rounded-lg px-3 py-1 whitespace-nowrap">
                          <div className="font-bold text-white text-sm">
                            {displayName}
                          </div>
                        </div>
                        {/* Description card on hover */}
                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 rounded-lg p-4 w-64 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          <div className="font-bold text-white text-base mb-2">{skill.name}</div>
                          <div className="text-sm text-gray-300">{skill.description}</div>
                          <div className="text-xs text-gray-400 mt-2">
                            Max Level: {skill.maxLevel}
                          </div>
                          {skill.prerequisites.length > 0 && (
                            <div className="text-xs text-purple-400 mt-1">
                              Requires: {skill.prerequisites.map(p => p.skillId).join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                      {skill.prerequisites.length > 0 && (
                        <div className="text-sm text-purple-400 mt-2">
                          {skill.prerequisites.map(p => p.skillId).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
