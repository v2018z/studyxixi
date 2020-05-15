import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import { loginUrl, homeUrl } from './urls';
import { win } from './browser-window';
import './ipc-main-register';
