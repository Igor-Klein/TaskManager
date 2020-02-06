import { fetch } from './Fetch';
import React from 'react';

export default class TaskRepository {
 create (task) {
    return fetch('POST', window.Routes.api_v1_tasks_path(), task)
}}
