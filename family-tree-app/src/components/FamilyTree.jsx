import React, { useState, useRef, useEffect, useCallback } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import familyData from "../data/familyData.json";
import { 
  StyledNode, 
  NodeContent, 
  Image, 
  Details, 
  Sidebar, 
  SidebarContent, 
  CloseButton, 
  Background, 
  TreeWrapper, 
  SidebarImage,
  TreeContainer,
  ControlPanel,
  ControlButton,
  NodeExpander,
  ZoomText,
  PersonName,
  PersonAge,
  NodeBadge
} from "../styles/TreeStyles";

const FamilyTree = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [collapsedNodes, setCollapsedNodes] = useState({});
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const sidebarRef = useRef(null);
  const containerRef = useRef(null);

  // Handle pan functionality
  const handleMouseDown = useCallback((e) => {
    if (e.button === 0) { // Only left mouse button
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [position]);
  
  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Zoom functionality
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Toggle node collapse
  const toggleNodeCollapse = (nodeId, e) => {
    e.stopPropagation();
    setCollapsedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const handleNodeClick = (person) => {
    setSelectedPerson(person);
  };

  const handleCloseSidebar = () => {
    setSelectedPerson(null);
  };

  // Handle keyboard events for navigation
  const handleKeyDown = useCallback((e) => {
    const step = 20;
    switch (e.key) {
      case "ArrowUp":
        setPosition(prev => ({ ...prev, y: prev.y + step }));
        break;
      case "ArrowDown":
        setPosition(prev => ({ ...prev, y: prev.y - step }));
        break;
      case "ArrowLeft":
        setPosition(prev => ({ ...prev, x: prev.x + step }));
        break;
      case "ArrowRight":
        setPosition(prev => ({ ...prev, x: prev.x - step }));
        break;
      case "+":
        handleZoomIn();
        break;
      case "-":
        handleZoomOut();
        break;
      case "0":
        handleReset();
        break;
      default:
        return;
    }
  }, []);

  // Handle mouse wheel zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate the mouse position relative to the container center
    const containerCenterX = rect.width / 2;
    const containerCenterY = rect.height / 2;
    const mouseOffsetX = mouseX - containerCenterX;
    const mouseOffsetY = mouseY - containerCenterY;

    // Calculate zoom factor based on wheel delta
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(scale * zoomFactor, 0.5), 2);

    // Calculate new position to zoom towards mouse pointer
    const newPositionX = position.x - (mouseOffsetX * (newScale - scale)) / scale;
    const newPositionY = position.y - (mouseOffsetY * (newScale - scale)) / scale;

    setScale(newScale);
    setPosition({ x: newPositionX, y: newPositionY });
  }, [scale, position]);

  // Add mouse and keyboard event listeners
  useEffect(() => {
    const container = containerRef.current;
    
    if (container) {
      container.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("keydown", handleKeyDown);
      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("keydown", handleKeyDown);
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleKeyDown, handleWheel]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSelectedPerson(null);
      }
    };

    if (selectedPerson) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedPerson]);

  // Render individual node
  const renderTreeNode = (person) => {
    const hasChildren = person.children && person.children.length > 0;
    const isCollapsed = collapsedNodes[person.id];
    
    return (
      <TreeNode
        key={person.id}
        label={
          <StyledNode onClick={() => handleNodeClick(person)}>
            <NodeContent>
              <Image src={person.image} alt={person.name} />
              <Details>
                <PersonName>{person.name} {person.surname}</PersonName>
                <PersonAge>Age: {person.age}</PersonAge>
              </Details>
              {hasChildren && (
                <NodeExpander 
                  onClick={(e) => toggleNodeCollapse(person.id, e)}
                  isCollapsed={isCollapsed}
                >
                  {isCollapsed ? '+' : '−'}
                </NodeExpander>
              )}
              {hasChildren && (
                <NodeBadge>{person.children.length}</NodeBadge>
              )}
            </NodeContent>
          </StyledNode>
        }
      >
        {hasChildren && !isCollapsed &&
          person.children.map((child) => renderTreeNode(child))}
      </TreeNode>
    );
  };

  return (
    <Background>
      <TreeContainer 
        ref={containerRef}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <TreeWrapper
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'center',
            transition: isDragging ? 'none' : 'transform 0.3s'
          }}
        >
          <Tree
            lineWidth={"2px"}
            lineColor={"#4a90e2"}
            lineBorderRadius={"12px"}
            label={
              <StyledNode onClick={() => handleNodeClick(familyData)}>
                <NodeContent>
                  <Image src={familyData.image} alt={familyData.name} />
                  <Details>
                    <PersonName>{familyData.name} {familyData.surname}</PersonName>
                    <PersonAge>Age: {familyData.age}</PersonAge>
                  </Details>
                  {familyData.children && familyData.children.length > 0 && (
                    <NodeExpander 
                      onClick={(e) => toggleNodeCollapse('root', e)}
                      isCollapsed={collapsedNodes['root']}
                    >
                      {collapsedNodes['root'] ? '+' : '−'}
                    </NodeExpander>
                  )}
                  {familyData.children && (
                    <NodeBadge>{familyData.children.length}</NodeBadge>
                  )}
                </NodeContent>
              </StyledNode>
            }
          >
            {familyData.children && !collapsedNodes['root'] &&
              familyData.children.map((member) => renderTreeNode(member))}
          </Tree>
        </TreeWrapper>
      </TreeContainer>

      {/* Control Panel */}
      <ControlPanel>
        <ControlButton onClick={handleZoomIn}>+</ControlButton>
        <ZoomText>{Math.round(scale * 100)}%</ZoomText>
        <ControlButton onClick={handleZoomOut}>−</ControlButton>
        <ControlButton onClick={handleReset}>Reset</ControlButton>
      </ControlPanel>

      {/* Sidebar */}
      <Sidebar open={selectedPerson !== null} ref={sidebarRef}>
        {selectedPerson && (
          <SidebarContent>
            <CloseButton onClick={handleCloseSidebar}>×</CloseButton>
            <SidebarImage 
              src={selectedPerson.image} 
              alt={selectedPerson.name}
            />
            <h2>{selectedPerson.name} {selectedPerson.surname}</h2>
            <p><strong>Age:</strong> {selectedPerson.age}</p>
            {selectedPerson.children && (
              <>
                <p><strong>Children:</strong> {selectedPerson.children.length}</p>
                <div>
                  {selectedPerson.children && selectedPerson.children.map(child => (
                    <div key={child.id} onClick={() => handleNodeClick(child)} style={{ cursor: 'pointer', margin: '5px 0', padding: '8px', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
                      {child.name} {child.surname}
                    </div>
                  ))}
                </div>
              </>
            )}
          </SidebarContent>
        )}
      </Sidebar>
    </Background>
  );
};

export default FamilyTree;