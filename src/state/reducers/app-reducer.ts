export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type AppDomainType = {
    status: RequestStatusType;
    error: string | null;
};
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type AppActionsType = ReturnType<InferValueTypes<typeof appActions>>;

const initialState: AppDomainType = {
    status: "idle",
    error: null,
};

export const appReducer = (
    state = initialState,
    action: AppActionsType
): AppDomainType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return { ...state, status: action.status };
        case "APP/SET-ERROR":
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export const appActions = {
    setStatusAC: (status: RequestStatusType) => ({
        type: "APP/SET-STATUS" as const,
        status,
    }),
    setErrorAC: (error: string | null) => ({
        type: "APP/SET-ERROR" as const,
        error,
    }),
};
