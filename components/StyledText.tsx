import Colors from '@app/constants/Colors';
import { Text as DefaultText } from 'react-native';

export function Text(props: DefaultText['props']) {
    const { style, ...otherProps } = props;
    const color = Colors.White;

    return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
