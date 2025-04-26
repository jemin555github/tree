  import React from "react";
  import { Tree, TreeNode } from "react-organizational-chart";
  import familyData from "../data/familyData.json";
  import { StyledNode, NodeContent, Image, Details } from "../styles/TreeStyles.js";

  const renderTreeNode = (person) => (
    <TreeNode
      key={person.id}
      label={
        <StyledNode>
          <NodeContent>
            <Image src={person.image} alt={person.name} />
            <Details>
              <strong>{person.name} {person.surname}</strong>
              <span>Role: {person.role}</span>
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

  const FamilyTree = () => {
    return (
      <div style={{ margin: "40px", overflowX: "auto" }}>
        <Tree
          lineWidth={"2px"}
          lineColor={"#4a90e2"}
          lineBorderRadius={"12px"}
          label={
            <StyledNode>
              <NodeContent>
                <Image src={familyData.image} alt={familyData.name} />
                <Details>
                  <strong>{familyData.name} {familyData.surname}</strong>
                  <span>Role: {familyData.role}</span>
                  <span>Age: {familyData.age}</span>
                </Details>
              </NodeContent>
            </StyledNode>
          }
        >
          {familyData.children.map((member) => renderTreeNode(member))}
        </Tree>
      </div>
    );
  };

  export default FamilyTree;
