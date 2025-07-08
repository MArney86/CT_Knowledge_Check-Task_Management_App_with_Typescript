// simple encryption/decryption utilities for localStorage
// note: This is for basic obfuscation only, not secure encryption, replace with a proper library for production use

import type { Task } from "../components/Task";

/* simple XOR encryption using user_id as key */
function xorEncrypt(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const keyChar = key[i % key.length];
    result += String.fromCharCode(text.charCodeAt(i) ^ keyChar.charCodeAt(0));
  }
  return result;
}

/* encode string to Base64 */
function encodeBase64(str: string): string {
  return btoa(encodeURIComponent(str));
}

/* decode Base64 string */
function decodeBase64(str: string): string {
  return decodeURIComponent(atob(str));
}

/* save encrypted tasks to localStorage */
export function saveTasksToStorage(tasks: Task[], userId: string): void {
  try {
    const data = {
      tasks,
      user_id: userId,
      timestamp: new Date().toISOString()
    };
    
    const jsonString = JSON.stringify(data);
    const encrypted = xorEncrypt(jsonString, userId);
    const encoded = encodeBase64(encrypted);
    
    localStorage.setItem(`tasks_${userId}`, encoded);
    console.log('Tasks saved to localStorage');
  } catch (error) {
    console.error('Error saving tasks to storage:', error);
  }
}

/* load and decrypt tasks from localStorage */
export function loadTasksFromStorage(userId: string): Task[] | null {
  try {
    const encoded = localStorage.getItem(`tasks_${userId}`);
    if (!encoded) {
      console.log('No tasks found in localStorage for user:', userId);
      return null;
    }
    
    const encrypted = decodeBase64(encoded);
    const decrypted = xorEncrypt(encrypted, userId); // XOR is symmetric
    const data = JSON.parse(decrypted);
    
    // verify the user_id matches
    if (data.user_id !== userId) {
      console.warn('User ID mismatch in stored data');
      return null;
    }
    
    // convert date strings back to Date objects
    const tasks = data.tasks.map((task: Task) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined
    }));
    
    console.log('Tasks loaded from localStorage:', tasks.length, 'tasks');
    return tasks;
  } catch (error) {
    console.error('Error loading tasks from storage:', error);
    return null;
  }
}

/* clear tasks from localStorage for a specific user */
export function clearTasksFromStorage(userId: string): void {
  try {
    localStorage.removeItem(`tasks_${userId}`);
    console.log('Tasks cleared from localStorage for user:', userId);
  } catch (error) {
    console.error('Error clearing tasks from storage:', error);
  }
}
