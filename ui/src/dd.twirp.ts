// Generated by protoc-gen-twirp_typescript. DO NOT EDIT
import {dd} from './dd.pb';
import {createTwirpAdapter} from 'pbjs-twirp';
import Axios from 'axios';

const getServiceMethodName = (fn: any): string => {
	if (fn === dd.DD.prototype.auth) {
		return 'Auth';
    }
	if (fn === dd.DD.prototype.getQuest) {
		return 'GetQuest';
    }
	if (fn === dd.DD.prototype.getQuests) {
		return 'GetQuests';
    }
	if (fn === dd.DD.prototype.createQuest) {
		return 'CreateQuest';
    }
	if (fn === dd.DD.prototype.editQuest) {
		return 'EditQuest';
    }

    throw new Error('Unknown Method');
};


export const DDPathPrefix = '/twirp/dd.DD/';

export const createDD = (baseURL: string): dd.DD => {
	const axios = Axios.create({
        baseURL: baseURL + DDPathPrefix,
        headers: {
          Accept: 'application/protobuf'
        }
    });

    return dd.DD.create(createTwirpAdapter(axios, getServiceMethodName));
};
