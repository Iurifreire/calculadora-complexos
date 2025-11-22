import Tree from "react-d3-tree";

export default function TreeGraph({ treeData }) {

    const isNumericNode = (value) => /^-?\d+(\.\d+)?$/.test(value);
    const isImaginary = (value) => /^-?\d*(\.\d+)?i$/.test(value);

    const renderNode = ({ nodeDatum }) => {
        const name = nodeDatum.name;
        const isNumber = isNumericNode(name);
        const isImag = isImaginary(name);

        return (
            <g>

                <defs>

                    <radialGradient id="cyan3d" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#7efcff" />
                        <stop offset="40%" stopColor="#38d4e9" />
                        <stop offset="100%" stopColor="#0a8fb8" />
                    </radialGradient>

                    <filter id="neon-cyan" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <radialGradient id="violet3d" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#e6a4ff" />
                        <stop offset="40%" stopColor="#b056f7" />
                        <stop offset="100%" stopColor="#6a1fb8" />
                    </radialGradient>

                    <filter id="neon-violet" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="neon-gold" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>


                    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f48c06" />
                        <stop offset="100%" stopColor="#ffba08" />
                    </linearGradient>

                    <filter id="shadow-3d" x="-40%" y="-40%" width="180%" height="180%" filterUnits="userSpaceOnUse">
                        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="rgba(0,0,0,0.55)" />
                    </filter>

                </defs>

                {isNumber && (
                    <circle
                        r={28}
                        fill="url(#cyan3d)"
                        stroke="#00eaff"
                        strokeWidth={2}
                        filter="url(#shadow-3d)"
                    />
                )}

                {isImag && (
                    <circle
                        r={28}
                        fill="url(#violet3d)"
                        stroke="#d36bff"
                        strokeWidth={2}
                        filter="url(#shadow-3d)"
                    />
                )}

                {!isNumber && !isImag && (
                    <rect
                        width="120"
                        height="50"
                        x="-60"
                        y="-25"
                        rx={10}
                        fill="url(#grad1)"
                        stroke="#ffd86b"
                        strokeWidth={4}
                        filter="url(#shadow-3d)"
                    />
                )}

                {/* Texto */}
                <text
                    textAnchor="middle"
                    dy="6"
                    fill={isNumber ? "#ffffff" : isImag ? "#ffffff" : "#0b0b0b"}
                    fontSize="26px"
                    fontWeight="bold"
                >
                    {name}
                </text>
            </g>
        );
    };

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <Tree
                data={[treeData]}
                orientation="vertical"
                translate={{ x: 300, y: 50 }}
                renderCustomNodeElement={renderNode}
                pathFunc="straight"
            />
        </div>
    );
}
