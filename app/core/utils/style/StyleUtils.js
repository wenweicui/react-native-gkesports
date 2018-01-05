/** * Created by InforeXuan on 2017/9/27. */
const Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
const scale = width / 375.0;
let _type = ['width', 'height',
    'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
    'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
    'fontSize', 'borderRadius', 'borderWidth', 'lineHeight'
];

export function resize2Dp(style: Object) {
    _type.map((value) => {
        if (Object.keys(style).includes(value)) {
            if (style[key] !== undefined && typeof style[key] === "number") {
                style[key] *= scale
            }
        }
    })
}
