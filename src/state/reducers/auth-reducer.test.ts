import { AuthDomainType, authReducer, setIsLoggedIn } from "./auth-reducer";

let startState: AuthDomainType;

beforeEach(() => {
    startState = {
        isLoggedIn: false,
    };
});

test("isLoggedIn should be changed", () => {
    const endState = authReducer(startState, setIsLoggedIn({ value: true }));

    expect(endState.isLoggedIn).toBeTruthy();
});
