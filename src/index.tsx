import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import { Box, BoxProps, IconButton, IconButtonProps, ThemeOptions, ThemeProvider, Tooltip, createTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import { WebUtils } from './webUtils';

export type ThemeModes = 'light' | 'dark'

export type ThemeModeOrigins = 'system' | 'user'

export interface IThemeModeData {
  mode: ThemeModes,
  origin: ThemeModeOrigins,
}

export interface IThemeModeContext {
  toggleMode?: () => void,
  themeMode?: IThemeModeData,
}

export const ThemeModeContext = React.createContext<IThemeModeContext>({});

// ThemeBoxComponent

export function ThemeModeBoxComponent(props: BoxProps) {
  return <Box
    {...props}

    sx={{
      bgcolor: 'background.default',
      color: 'text.primary',
      ...props.sx
    }}
  >
    {props.children}
  </Box>;
}

//ToggleThemeModeComponent

export interface ThemeModeToggleComponentProps extends IconButtonProps {
  lightIcon?: React.ReactNode | undefined,
  darkIcon?: React.ReactNode | undefined,
  systemIcon?: React.ReactNode | undefined,
  toolTipContent?: React.ReactNode | undefined,
}

export const ThemeModeToggleComponent = (props: ThemeModeToggleComponentProps) => {
  const { lightIcon, darkIcon, systemIcon, toolTipContent, ...rest } = props
  const themeModeContext = React.useContext(ThemeModeContext);

  return <>
    <Tooltip
      title={props.toolTipContent || 'Theme'}
    >
      <IconButton
        {...rest}
        sx={{ ml: 1, ...props.sx }}
        onClick={e => {
          if (themeModeContext.toggleMode)
            themeModeContext.toggleMode()
          if (props.onClick)
            props.onClick(e)
        }}
        color={props.color || "inherit"}
      >
        {themeModeContext.themeMode?.origin === 'system' ?
          (systemIcon || <InsertEmoticonIcon />) : (themeModeContext.themeMode?.mode === 'light' ?
            (lightIcon || <Brightness7Icon />) : (darkIcon || <Brightness4Icon />))}
      </IconButton>
    </Tooltip>
  </>
}

//ThemeModeManagerComponent

export interface ThemeModeProviderProps extends React.PropsWithChildren {
  children?: React.ReactNode | undefined,
  themeOptions?: ThemeOptions | undefined,
  themeOptionsLight?: ThemeOptions | undefined,
  themeOptionsDark?: ThemeOptions | undefined,
  onChangeMode?: (mode: IThemeModeData) => void | undefined,
  boxProps?: BoxProps | undefined,
  disableSystemColor?: boolean | undefined
}

export const ThemeModeProvider = (props: ThemeModeProviderProps) => {

  const systemMode: ThemeModes = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  const modeDataFromSystem: IThemeModeData = {
    origin: 'system',
    mode: systemMode
  }

  let modeDataFromCookie: IThemeModeData | undefined = WebUtils.getCookieObj('@theme-mode-data')
  if (modeDataFromCookie?.origin == 'system')
    modeDataFromCookie = modeDataFromSystem

  const [modeData, setModeData] = React.useState<IThemeModeData>(modeDataFromCookie || modeDataFromSystem);

  const themeMode = React.useMemo(
    () => {
      const themeModeContext: IThemeModeContext = {
        toggleMode: () => {
          console.log(`props.disableSystemColor: ${props.disableSystemColor}`)

          const modeDataTmp: IThemeModeData =
            props.disableSystemColor ?
              modeData.mode == 'light' ? {
                origin: 'user',
                mode: 'dark'
              } : {
                origin: 'user',
                mode: 'light'
              } :
              modeData.origin == 'system' ? {
                origin: 'user',
                mode: 'light',
              } : (
                modeData.mode == 'light' ? {
                  origin: 'user',
                  mode: 'dark'
                } : {
                  origin: 'system',
                  mode: systemMode
                }
              )

          WebUtils.setCookie('@theme-mode-data', JSON.stringify(modeDataTmp), 1000)
          setModeData(modeDataTmp);
          if (props.onChangeMode)
            props.onChangeMode(modeDataTmp)
        },
        themeMode: modeData
      }
      return themeModeContext
    },
    [modeData],
  );

  const themeOptions: ThemeOptions | undefined = props.themeOptions || (modeData.mode == 'light' ? props.themeOptionsLight : props.themeOptionsDark)

  const theme = React.useMemo(
    () =>
      createTheme({
        ...themeOptions,
        palette: {
          ...themeOptions?.palette,
          mode: modeData.mode,
        },
      }),
    [modeData],
  );

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        <ThemeModeBoxComponent {...props.boxProps}>
          {props.children}
        </ThemeModeBoxComponent>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}