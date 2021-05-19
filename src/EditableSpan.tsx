import React, { ChangeEvent, useState } from "react";

import { TextField } from "@material-ui/core";

type EditableSpanPropsType = {
    title: string;
    onChangeTitle: (newValue: string) => void;
};

const EditableSpan = React.memo(function ({
    title,
    onChangeTitle,
}: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [stateTitle, setStateTitle] = useState("");

    const activateEditMode = () => {
        setEditMode(true);
        setStateTitle(title);
    };

    const deactivateEditMode = () => setEditMode(false);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStateTitle(e.currentTarget.value);
        onChangeTitle(e.currentTarget.value);
    };

    return editMode ? (
        <TextField
            value={stateTitle}
            onBlur={deactivateEditMode}
            onChange={onChangeHandler}
            autoFocus
        />
    ) : (
        <span style={{ cursor: "pointer" }} onDoubleClick={activateEditMode}>
            {title}
        </span>
    );
});

export default EditableSpan;
