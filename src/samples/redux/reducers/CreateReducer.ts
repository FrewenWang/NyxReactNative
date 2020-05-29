interface Action {
  type: string;
  payload: any;
}

interface State {
  data: any[];
  loading: boolean;
}

const initialState = {
  data: [],
  loading: false,
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
