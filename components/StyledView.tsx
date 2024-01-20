import Colors from '@app/constants/Colors';
import { View as DefaultView } from 'react-native';

export function View(props: DefaultView['props']) {
    const { style, ...otherProps } = props;
    const backgroundColor = Colors.Twilight;

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
