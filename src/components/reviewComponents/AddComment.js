import {
    Input,
} from "@chakra-ui/react";

import "./AddComment.css"

function AddComment(props) {
    return (
        <div className="forms">
            <label>Comments are appreciated!</label>
         
                <Input type="text" name="description" placeholder="Add a place's description" size="lg" value={props.comment} onChange={(event) => props.onComment(event.target.value)}
            />
        </div>
    )
}

export default AddComment