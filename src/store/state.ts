import { ProjectInfo } from "@/store/types";

type State = {
  id: string;
  isError: boolean;
  projectInfo: ProjectInfo;
};

const state: State = {
  projectInfo: {
    id: "",
    height: 0,
    items: [],
    name: "",
    width: 0
  } as ProjectInfo,
  isError: false,
  id: ""
};

export default state;
