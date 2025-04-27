import styled from "styled-components";

export const Background = styled.div`
  background-color: #f6f7ca;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
`;

export const TreeWrapper = styled.div`
  margin: 60px auto;
  overflow: auto;
  flex-grow: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: start;
`;

export const StyledNode = styled.div`
  padding: 14px;
  border-radius: 16px;
  background-color: #fff7e6;
  display: inline-block;
  border: 2px solid #f5c16c;
  min-width: 220px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
  }
`;

export const NodeContent = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  margin-right: 16px;
  object-fit: cover;
`;

export const SidebarImage = styled.img`
  width: 250px;
  height: 300px;
  border-radius: 20px;
  object-fit: cover;
  margin-bottom: 20px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
`;

export const Sidebar = styled.div`
  width: 320px;
  background: #ffffff;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  padding: 30px 20px;
  position: fixed;
  right: ${({ open }) => (open ? "0" : "-340px")};
  top: 0;
  height: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  transition: right 0.4s ease;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; /* Scroll if content is larger */
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
  color: #555;
  transition: color 0.2s;
  &:hover {
    color: #000;
  }
`;
