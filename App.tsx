/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import {
    Text, View
} from 'react-native';

function ScreenA() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen A</Text>
    </View>
  );
}
function ScreenB() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen B</Text>
    </View>
  );
}

//#region StaticAPI

const ConditionContext = createContext(0)

const ConditionContextProvider = ({ children } : PropsWithChildren) => {
    const [number, setNumber] = useState(0)
    useEffect(() => {
        const interval = setInterval(
            () => {
                setNumber(_number => {
                    console.log(_number + 1)
                    return _number + 1
                })
            },
            2000
        )
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <ConditionContext.Provider value={number}>
            {children}
        </ConditionContext.Provider>
    )
}

const useCheckConditionA = () => {
    const value = useContext(ConditionContext)

    return value < 5
}

const useCheckConditionB = () => {
    const value = useContext(ConditionContext)

    return value >= 5
}

const RootStack = createNativeStackNavigator({
  screens: {
    ScreenA: {
      if: useCheckConditionA,
      screen: ScreenA,
    },
    ScreenB: {
      if: useCheckConditionB,
      screen: ScreenB,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

const App = () => {
    return (
        <ConditionContextProvider>
            <Navigation />
        </ConditionContextProvider>
    );
}
//#endregion

//#region DynamicAPI

//  const Stack = createNativeStackNavigator();

// function RootStack() {
//     const [number, setNumber] = useState(0)

//     useEffect(() => {
//         const interval = setInterval(
//             () => {
//                 setNumber(_number => {
//                     console.log(_number + 1)
//                     return _number + 1
//                 })
//             },
//             2000
//         )
//         return () => {
//             clearInterval(interval)
//         }
//     }, [])

//     return (
//         <Stack.Navigator>
//             {(number > 5) ? (
//                 <Stack.Screen name="ScreenB" component={ScreenB} />
//             ) : (<Stack.Screen name="ScreenA" component={ScreenA} />
//             )}
//         </Stack.Navigator>
//     );
// }

// const App = () => {
//     return (
//         <NavigationContainer>
//             <RootStack />
//         </NavigationContainer>
//     );
// }

//#endregion

export default App;
