import "./TreePage.css";
import TreeGraph from "../../components/TreeGraph/TreeGraph";
import { useNavigate, useLocation } from "react-router-dom";

export default function TreePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const arvore = location.state?.arvore;

    return (
        <div className="tree-page-container">
            <h2>ÁRVORE DE ANÁLISE</h2>
            <div className="tree-container">
                {arvore ? <TreeGraph treeData={arvore} /> : <p>Nenhuma árvore disponível.</p>}
                <button className="back-btn" onClick={() => navigate('/')}>Voltar</button>
            </div>
        </div>
    )
}