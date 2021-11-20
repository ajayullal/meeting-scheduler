import {Layout} from '../components';

export default function withAppShell(Component) {
    return function ComponentWithAppShell(props) {
        return (
            <Layout>
                <Component {...props}></Component>
            </Layout>
        );
    }
}