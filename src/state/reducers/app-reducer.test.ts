import {
    AppDomainType,
    appReducer,
    setAppErrorAC,
    setAppInitializedAC,
    setAppStatusAC,
} from "./app-reducer";

let startState: AppDomainType;

beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
        isInitialized: false,
    };
});

test("correct error message should be set", () => {
    const endState = appReducer(
        startState,
        setAppErrorAC({ error: "some error" })
    );

    expect(endState.error).toBe("some error");
});

test("correct status should be set", () => {
    const endState = appReducer(
        startState,
        setAppStatusAC({ status: "loading" })
    );

    expect(endState.status).toBe("loading");
});

test("isInitialized should be changed", () => {
    const endState = appReducer(
        startState,
        setAppInitializedAC({ value: true })
    );

    expect(endState.isInitialized).toBeTruthy();
});
