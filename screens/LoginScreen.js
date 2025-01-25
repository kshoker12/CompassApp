import { View, Text,  KeyboardAvoidingView, Image, SafeAreaView, ActivityIndicator} from 'react-native'
import React, {useContext, useState, useRef, useEffect} from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input/dist'
import { AppContext } from '../context/AppContext'
import * as AppHelper from '../Helpers/HelperFunctions'
import * as financeHelper from '../Helpers/financesHelper'
import * as lifeUltimateTeamHelper from '../Helpers/lifeUltimateTeamHelper'
import * as dreamsJournalHelper from '../Helpers/dreamJournalHelper';
import * as solutionHelper from '../Helpers/solutionsHelper';
import * as beastmodeHelper from '../Helpers/beastmodeHelper'
import * as dietTrackerHelper from '../Helpers/dietTrackerHelper'
import * as compassHelper from '../Helpers/compassHelper'
import BackgroundImage from '../components/BackgroundImage'
import DreamMeadowTitle from '../components/DreamMeadowTitle'
import ScreenLoader from '../components/ScreenLoader'
import * as securityHelper from '../Helpers/securityHelper'

/**
 * @description Login Screen where user types password and loads data for the app
 * @param {Object} navigation -> React navigation allowing user to navigate to other screens
 * @returns {JSX.Element} 
 */
const LoginScreen = ({navigation}) => {
    // Context Variables
    const { appPassword, password, dispatch } = useContext(AppContext);

    // State variable tracking user inputted password
    const [code, setCode] = useState();

    // Indicator to user that data is being loaded
    const [loading, setLoading] = useState(false);

    // Indicator determining whether to clear inputs upon failed password attempt
    const [clearInputs, setClearInputs] = useState(false);

    /** OTP Input ref */
    const otpRef = useRef();

    /**
     * @description Styling to be applied for OTP View
     */
    const otpViewStyles = {
        width: 50, 
        height: 50,
        marginHorizontal: 10,
        borderRadius: 12, 
        borderWidth: 2,
        borderColor: '#e2e8f0',
        backgroundColor: '#6c71a6',
        color: '#e2e8f0',
        fontSize: 25
    }

    /**
     * @description Checks for successful password which then attempts to read data from database
     * @param {string} code -> User inputted code 
     */
    const onCodeFilled = async (code) => {
        // Proceed to load data if password is correct otherwise clear inputs
        if (code === appPassword) {
            setLoading(true);
            await securityHelper.login(password);
            await AppHelper.readData(dispatch);
            await financeHelper.fetchFinances(dispatch);
            await lifeUltimateTeamHelper.fetchSubTraits(dispatch);
            await dreamsJournalHelper.fetchDreams(dispatch);
            await solutionHelper.fetchSolutions(dispatch);
            await beastmodeHelper.fetchBeastmode(dispatch);
            await dietTrackerHelper.fetchDietTracker(dispatch);
            await compassHelper.fetchCompass(dispatch);
            setLoading(false);
            navigation.navigate('HomeTabs');
        } else {
            setCode('');
            setClearInputs(true);
        }
    }

    // /**
    //  * Set otp input to focused on load
    //  */
    // useEffect(() => {
    //     setTimeout(() => otpRef.current.focusField(0), 250);
    // }, []);
        

    return (
        <SafeAreaView>
            <View className = 'h-full bg-black w-full'>
                
                <KeyboardAvoidingView
                    className = 'flex-1 items-center z-50'
                    behavior='padding'
                >
                    <BackgroundImage imagePath = {require('../images/loginbg2.jpg')} shade = 'bg-purple-950'/>
                    <DreamMeadowTitle title = 'Compass App' style = 'self-center' textStyle = 'text-slate-100 text-8xl pt-8'/>
                    {/* <Image source = {require('../images/compass2.jpg')}/> */}
                    <ScreenLoader 
                        title = 'Loading...'
                        textStyle = 'text-slate-200'
                        style = 'absolute'
                        indicatorStyling = 'white'
                        loading = {loading}
                    />
                    <View className = {`${loading ? 'bottom-0' : '-bottom-20'} z-50`} style = {{zIndex: 100000}}>
                        <OTPInputView
                            ref={otpRef}
                            code={code}
                            onCodeChanged={(code)=>{
                                setCode(code);
                                setClearInputs(false);
                            }}
                            pinCount={6}
                            autoFocusOnLoad = {false}
                            onCodeFilled={onCodeFilled}
                            codeInputFieldStyle={otpViewStyles}
                            secureTextEntry
                            clearInputs = {clearInputs}
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}
                    
export default LoginScreen;
