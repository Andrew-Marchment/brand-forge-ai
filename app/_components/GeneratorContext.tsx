"use client";

import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

type StateType = {
  hasName: boolean;
  companyName: string;
  companyDescription: string;
  nameOptions: string[];
  selectedName: string;
  selectedNameConfirmed: boolean;
  imagePrompt: string;
  imageUrl: string;
};

export const initialState: StateType = {
  hasName: false,
  companyName: "",
  companyDescription: "",
  nameOptions: [""],
  selectedName: "",
  selectedNameConfirmed: false,
  imagePrompt: "",
  imageUrl: "",
};

const enum REDUCER_ACTION_TYPE {
  SET_HAS_NAME,
  SET_COMPANY_NAME,
  SET_COMPANY_DESCRIPTION,
  SET_NAME_OPTIONS,
  SET_SELECTED_NAME,
  SET_SELECTED_NAME_CONFIRMED,
  SET_IMAGE_PROMPT,
  SET_IMAGE_URL,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: any;
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_HAS_NAME:
      return { ...state, hasName: action.payload ?? false };
    case REDUCER_ACTION_TYPE.SET_COMPANY_NAME:
      return { ...state, companyName: action.payload ?? "" };
    case REDUCER_ACTION_TYPE.SET_COMPANY_DESCRIPTION:
      return { ...state, companyDescription: action.payload ?? "" };
    case REDUCER_ACTION_TYPE.SET_NAME_OPTIONS:
      return { ...state, nameOptions: action.payload ?? [""] };
    case REDUCER_ACTION_TYPE.SET_SELECTED_NAME:
      return { ...state, selectedName: action.payload ?? "" };
    case REDUCER_ACTION_TYPE.SET_SELECTED_NAME_CONFIRMED:
      return { ...state, selectedNameConfirmed: true };
    case REDUCER_ACTION_TYPE.SET_IMAGE_PROMPT:
      return { ...state, imagePrompt: action.payload ?? "" };
    case REDUCER_ACTION_TYPE.SET_IMAGE_URL:
      return { ...state, imageUrl: action.payload ?? "" };
    default:
      throw new Error("unknown action");
  }
};

const useGeneratorContext = (initialState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setHasName = useCallback(
    (hasName: boolean) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_HAS_NAME,
        payload: hasName,
      }),
    [],
  );

  const setCompanyName = useCallback(
    (name: string) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_COMPANY_NAME,
        payload: name,
      }),
    [],
  );

  const setCompanyDescription = useCallback(
    (description: string) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_COMPANY_DESCRIPTION,
        payload: description,
      }),
    [],
  );

  const setNameOptions = useCallback(
    (nameOptions: string[]) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_NAME_OPTIONS,
        payload: nameOptions,
      }),
    [],
  );

  const setSelectedName = useCallback(
    (name: string) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_SELECTED_NAME,
        payload: name,
      }),
    [],
  );

  const setSelectedNameConfirmed = useCallback(
    () =>
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_SELECTED_NAME_CONFIRMED,
      }),
    [],
  );

  const setImagePrompt = useCallback(
    (prompt: string) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_IMAGE_PROMPT,
        payload: prompt,
      }),
    [],
  );

  const setImageUrl = useCallback(
    (url: string) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_IMAGE_URL,
        payload: url,
      }),
    [],
  );

  return {
    state,
    setHasName,
    setCompanyName,
    setCompanyDescription,
    setNameOptions,
    setSelectedName,
    setSelectedNameConfirmed,
    setImagePrompt,
    setImageUrl,
  };
};

type UseGeneratorContextType = ReturnType<typeof useGeneratorContext>;

const initialContextState: UseGeneratorContextType = {
  state: initialState,
  setHasName: (hasName: boolean) => {},
  setCompanyName: (name: string) => {},
  setCompanyDescription: (description: string) => {},
  setNameOptions: (nameOptions: string[]) => {},
  setSelectedName: (name: string) => {},
  setSelectedNameConfirmed: () => {},
  setImagePrompt: (prompt: string) => {},
  setImageUrl: (url: string) => {},
};

export const GeneratorContext =
  createContext<UseGeneratorContextType>(initialContextState);

type ChildrenType = {
  children?: ReactElement | undefined;
};

export const GeneratorProvider = ({
  children,
  ...initialState
}: ChildrenType & StateType): ReactElement => {
  return (
    <GeneratorContext.Provider value={useGeneratorContext(initialState)}>
      {children}
    </GeneratorContext.Provider>
  );
};

type UseGeneratorHookType = {
  hasName: boolean;
  companyName: string;
  companyDescription: string;
  nameOptions: string[];
  selectedName: string;
  selectedNameConfirmed: boolean;
  imagePrompt: string;
  imageUrl: string;
  setHasName: (hasName: boolean) => void;
  setCompanyName: (name: string) => void;
  setCompanyDescription: (description: string) => void;
  setNameOptions: (nameOptions: string[]) => void;
  setSelectedName: (name: string) => void;
  setSelectedNameConfirmed: () => void;
  setImagePrompt: (prompt: string) => void;
  setImageUrl: (url: string) => void;
};

export const useGenerator = (): UseGeneratorHookType => {
  const {
    state: {
      hasName,
      companyName,
      companyDescription,
      nameOptions,
      selectedName,
      selectedNameConfirmed,
      imagePrompt,
      imageUrl,
    },
    setHasName,
    setCompanyName,
    setCompanyDescription,
    setNameOptions,
    setSelectedName,
    setSelectedNameConfirmed,
    setImagePrompt,
    setImageUrl,
  } = useContext(GeneratorContext);
  return {
    hasName,
    companyName,
    companyDescription,
    nameOptions,
    selectedName,
    selectedNameConfirmed,
    imagePrompt,
    imageUrl,
    setHasName,
    setCompanyName,
    setCompanyDescription,
    setNameOptions,
    setSelectedName,
    setSelectedNameConfirmed,
    setImagePrompt,
    setImageUrl,
  };
};
