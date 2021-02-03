import React from "react";

const QuickReply = (props) => {
	if(props.reply.structValue.fields.payload){
        return (
            <a href="" className="waves-effect waves-light btn-small"
            onClick ={(event)=>
                props.click(
                    event,
                    props.reply.structValue.fields.payload.stringValue,
                    props.reply.structValue.fields.text.stringValue,
                    )
            }
            >
                {props.reply.structValue.fields.text.stringValue}
            </a>
        );
    } else{
        return (
            <a href={props.reply.structValue.fields.link.stringValue} target="_blank" className="waves-effect waves-light btn-small">
                {props.reply.structValue.fields.text.stringValue}
            </a>
        );
    }
};

export default QuickReply;
