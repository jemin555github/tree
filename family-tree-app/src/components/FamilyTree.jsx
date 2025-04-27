import React, { useState, useRef, useEffect } from "react";
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
  SidebarImage 
} from "../styles/TreeStyles";

const FamilyTree = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const sidebarRef = useRef(null);

  const handleNodeClick = (person) => {
    setSelectedPerson(person);
  };

  const handleCloseSidebar = () => {
    setSelectedPerson(null);
  };

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

  const renderTreeNode = (person) => (
    <TreeNode
      key={person.id}
      label={
        <StyledNode onClick={() => handleNodeClick(person)}>
          <NodeContent>
            <Image src={person.image} alt={person.name} />
            <Details>
              <strong>{person.name} {person.surname}</strong>
              <span>Age: {person.age}</span>
            </Details>
          </NodeContent>
        </StyledNode>
      }
    >
      {person.children &&
        person.children.map((child) => renderTreeNode(child))}
    </TreeNode>
  );

  return (
    <Background>
      <TreeWrapper>
        <Tree
          lineWidth={"2px"}
          lineColor={"#4a90e2"}
          lineBorderRadius={"12px"}
          label={
            <StyledNode onClick={() => handleNodeClick(familyData)}>
              <NodeContent>
                <Image src={familyData.image} alt={familyData.name} />
                <Details>
                  <strong>{familyData.name} {familyData.surname}</strong>
                  <span>Age: {familyData.age}</span>
                </Details>
              </NodeContent>
            </StyledNode>
          }
        >
          {familyData.children.map((member) => renderTreeNode(member))}
        </Tree>
      </TreeWrapper>

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
            {/* You can add more details here if needed */}
          </SidebarContent>
        )}
      </Sidebar>
    </Background>
  );
};

export default FamilyTree;
