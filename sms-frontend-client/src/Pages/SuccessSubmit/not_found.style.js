import styled, { keyframes } from "styled-components";

export const Body = styled.div`
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  margin: 0;
  padding: 0;
  background-color: #fcfcfc;
  transition: 0.4s all ease;
  opacity: 1;
  .hidden {
    opacity: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #fcfcfc;
`;

export const Content = styled.div`
  text-align: center;
  margin-top: -80px;
`;

export const Window = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border: 4px solid #eee;
  border-radius: 16px;
  padding: 8rem 0;
  position: relative;
  transform-style: preserve-3d;
  display: inline-block;
  width: 180px;
  cursor: default;
  user-select: none;
  will-change: transform;
  transform: perspective(300px) rotateX(0deg) rotateY(0deg);
  background-color: white;
  margin-top: 6rem;

  @media screen and (min-width: 640px) {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 4rem 0;
    width: 320px;
    margin-top: 0;
  }
`;

export const Notch = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 100px;
  height: 1rem;
  background-color: #eee;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  transform: translateX(-50%);

  @media screen and (min-width: 640px) {
    display: none;
  }
`;

export const Dots = styled.div`
  transform: translateZ(20px);
  position: absolute;
  top: 0.5rem;
  left: 0.8rem;
  display: none; /* Hide dots by default */

  @media screen and (min-width: 640px) {
    display: inline-block;
  }
`;

export const Dot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  display: inline-block;
  margin-left: 0.3rem;

  &.red {
    background-color: #dc5c5c;
  }
  &.yellow {
    background-color: #ffc760;
  }
  &.green {
    background-color: #4eba4e;
  }
`;
export const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  transform: translateZ(40px);
  background: linear-gradient(270deg, #007aff, #f93191, #fdd746, #46d7ff);
  background-size: 400% auto;
  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradient} 20s linear infinite;

  @media screen and (min-width: 640px) {
    font-size: 5rem;
  }
`;

export const Subtitle = styled.h2`
  margin-top: 4rem;
  padding: 0 1rem;
  font-size: 1.5em;
  font-weight: bold;
`;

export const Description = styled.p`
  color: #ababab;
  font-size: 1rem;
  line-height: 1.5;
  padding: 0 1rem;
  box-sizing: border-box;
`;

export const HomeButton = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #eee;
  position: absolute;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);

  @media screen and (min-width: 640px) {
    display: none;
  }
`;
