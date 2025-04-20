import React from 'react';
import styled from 'styled-components';
import { Tree, TreeNode } from 'react-organizational-chart';
import familyData from '../data/familyData.json'; // adjust path if needed

// Styled components
const StyledNode = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: #8dcaff;
  display: inline-block;
  border: 1px solid #3399ff;
  font-weight: bold;
  text-align: center;
  min-width: 180px;
`;

const NodeContent = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const FamilyTree = () => {
  // Helper to render each node recursively
  const renderTreeNode = (person) => (
    <TreeNode
      key={person.id}
      label={
        <StyledNode>
          <NodeContent>
            <Image src={person.image} alt={person.name} />
            <Details>
              <span><strong>{person.role}</strong></span>
              <span>{person.name} {person.surname}</span>
            </Details>
          </NodeContent>
        </StyledNode>
      }
    >
      {person.children &&
        person.children.map((child) => renderTreeNode(child))}
    </TreeNode>
  );

  // Grandpa is root, others are his children
  const root = familyData.find((p) => p.role === 'Grandpa');
  const children = familyData.filter((p) => p.role !== 'Grandpa');

  return (
    root && (
      <Tree
        lineWidth={'2px'}
        lineColor={'#3399ff'}
        lineBorderRadius={'10px'}
        label={
          <StyledNode>
            <NodeContent>
              <Image src={root.image} alt={root.name} />
              <Details>
                <span><strong>{root.role}</strong></span>
                <span>{root.name} {root.surname}</span>
              </Details>
            </NodeContent>
          </StyledNode>
        }
      >
        {children.map((member) => renderTreeNode(member))}
      </Tree>
    )
  );
};

export default FamilyTree;
