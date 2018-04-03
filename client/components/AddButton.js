import React from "react";

import AddIcon from "material-ui-icons/Add";
import Button from 'material-ui/Button';

const AddButton = ({ disabled, onClick, style }) => {
    return (
        <Button
            disabled={ disabled }
            variant="fab"
            color="primary"
            style={ style }
            onClick={ onClick }>
            <AddIcon />
        </Button>
    );
}

export default AddButton