import styled from "styled-components";

export const StyledNode = styled.div`
  padding: 12px;
  border-radius: 12px;
  background-color: #f0f4ff;
  display: inline-block;
  border: 2px solid #4a90e2;
  min-width: 200px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

export const NodeContent = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;
