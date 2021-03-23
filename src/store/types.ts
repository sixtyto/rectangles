export type Rectangle = {
  id: string;
  color: string;
  rotation: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ProjectInfo = {
  id: string;
  height: number;
  items: Rectangle[];
  name: string;
  width: number;
};

export type State = {
  id: string;
  isError: boolean;
  projectInfo: ProjectInfo;
};
