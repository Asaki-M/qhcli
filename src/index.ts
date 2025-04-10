#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .name('qhcli')
  .description('A CLI tool for quickly creating projects')
  .version('1.0.0');

program
  .command('create')
  .description('Create a new project')
  .argument('<project-name>', 'project name')
  .action(async (projectName: string) => {
    const questions = [
      {
        type: 'list',
        name: 'template',
        message: '请选择项目模板:',
        choices: ['react-ts', 'vue-ts', 'node-ts']
      },
      {
        type: 'confirm',
        name: 'useGit',
        message: '是否初始化 Git 仓库?',
        default: true
      }
    ];

    const answers = await inquirer.prompt(questions);
    
    // 创建项目目录
    const projectPath = path.join(process.cwd(), projectName);
    if (fs.existsSync(projectPath)) {
      console.error(`错误: 目录 ${projectName} 已存在`);
      process.exit(1);
    }
    
    fs.mkdirSync(projectPath);
    console.log(`创建项目目录: ${projectName}`);

    // 根据模板创建项目
    switch (answers.template) {
      case 'react-ts':
        createReactTSProject(projectPath);
        break;
      case 'vue-ts':
        createVueTSProject(projectPath);
        break;
      case 'node-ts':
        createNodeTSProject(projectPath);
        break;
    }

    // 初始化 Git 仓库
    if (answers.useGit) {
      console.log('初始化 Git 仓库...');
      // 这里可以添加 Git 初始化逻辑
    }

    console.log('项目创建完成!');
  });

program.parse(process.argv);

function createReactTSProject(projectPath: string) {
  // 这里添加创建 React + TypeScript 项目的逻辑
  console.log('创建 React + TypeScript 项目...');
}

function createVueTSProject(projectPath: string) {
  // 这里添加创建 Vue + TypeScript 项目的逻辑
  console.log('创建 Vue + TypeScript 项目...');
}

function createNodeTSProject(projectPath: string) {
  // 这里添加创建 Node.js + TypeScript 项目的逻辑
  console.log('创建 Node.js + TypeScript 项目...');
} 