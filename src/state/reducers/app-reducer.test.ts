import { appActions, AppDomainType, appReducer } from "./app-reducer";

let startState: AppDomainType;

const { setErrorAC, setStatusAC } = appActions;

beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
    };
});

test("correct error message should be set", () => {
    const endState = appReducer(startState, setErrorAC("some error"));

    expect(endState.error).toBe("some error");
});

test("correct status should be set", () => {
    const endState = appReducer(startState, setStatusAC("loading"));

    expect(endState.status).toBe("loading");
});
