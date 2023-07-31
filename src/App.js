// routing
import Routes from 'routes';

// project imports
import Locales from 'template/ui-component/Locales';
import NavigationScroll from 'template/layout/NavigationScroll';
import RTLLayout from 'template/ui-component/RTLLayout';
import Snackbar from 'template/ui-component/extended/Snackbar';
import ThemeCustomization from 'template/themes';

// auth provider
import { FirebaseProvider as AuthProvider } from 'template/contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => (
    <ThemeCustomization>
        {/* RTL layout */}
        <RTLLayout>
            <Locales>
                <NavigationScroll>
                    <AuthProvider>
                        <>
                            <Routes />
                            <Snackbar />
                        </>
                    </AuthProvider>
                </NavigationScroll>
            </Locales>
        </RTLLayout>
    </ThemeCustomization>
);

export default App;
