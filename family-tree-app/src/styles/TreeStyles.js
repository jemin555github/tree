import styled from "styled-components";

export const Background = styled.div`
  background-color: #f7f9fc;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const TreeContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  user-select: none;
`;

export const TreeWrapper = styled.div`
  padding: 80px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  will-change: transform;
`;

export const StyledNode = styled.div`
  padding: 16px;
  border-radius: 18px;
  background-color: #ffffff;
  display: inline-block;
  border: 2px solid #e0e6f2;
  min-width: 240px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  text-align: left;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
    border-color: #c4d3f6;
  }
`;

export const NodeContent = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 16px;
  object-fit: cover;
  border: 3px solid #f0f4ff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SidebarImage = styled.img`
  width: 250px;
  height: 300px;
  border-radius: 24px;
  object-fit: cover;
  margin-bottom: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.02);
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const PersonName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
`;

export const PersonAge = styled.span`
  font-size: 14px;
  color: #718096;
`;

export const Sidebar = styled.div`
  width: 350px;
  background: #ffffff;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.08);
  padding: 30px 25px;
  position: fixed;
  right: ${({ open }) => (open ? "0" : "-380px")};
  top: 0;
  height: 100%;
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  
  h2 {
    color: #2d3748;
    margin-bottom: 16px;
    font-weight: 600;
  }
  
  p {
    color: #4a5568;
    margin-bottom: 12px;
    width: 100%;
    
    strong {
      color: #2d3748;
    }
  }
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 50px; /* space for close button */
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 15px;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  color: #718096;
  transition: color 0.2s, transform 0.2s;
  
  &:hover {
    color: #2d3748;
    transform: scale(1.1);
  }
`;

export const ControlPanel = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  border-radius: 50px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  z-index: 900;
`;

export const ControlButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background-color: #f0f4ff;
  color: #4a5568;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:last-child {
    width: auto;
    padding: 0 12px;
    border-radius: 17px;
    font-size: 14px;
  }
  
  &:hover {
    background-color: #e0e7ff;
    color: #3b4fe3;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const ZoomText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  min-width: 50px;
  text-align: center;
`;

export const NodeExpander = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.isCollapsed ? '#e0e7ff' : '#f0f4ff'};
  color: ${props => props.isCollapsed ? '#3b4fe3' : '#4a5568'};
  font-size: 16px;
  position: absolute;
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 2;
  
  &:hover {
    background-color: ${props => props.isCollapsed ? '#c7d2ff' : '#e0e7ff'};
    color: #3b4fe3;
  }
`;

export const NodeBadge = styled.div`
  position: absolute;
  right: -8px;
  bottom: -8px;
  background-color: #3b4fe3;
  color: white;
  font-size: 11px;
  font-weight: 600;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;