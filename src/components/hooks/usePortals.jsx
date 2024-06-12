import { useEffect } from 'react'
import ReactDOM from 'react-dom'


function UsePortals({ children }) {
    let node = document.createElement("div");

    useEffect(() => {
        document.body.appendChild(node);

        return () => {
            node.remove();
        };
    }, [node]);

    return ReactDOM.createPortal(children, node);
}

export default UsePortals