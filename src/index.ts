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

type TemplateKey = keyof typeof templates;

// 模板配置
const templates = {
  'vite-plugin-easy': {
    name: 'Vite Plugin Easy',
    description: '一个简单的 Vite 插件模板',
    path: 'vite-plugin-easy'
  }
  // 后续可以在这里添加更多模板
} as const;

// 规范化包名
function normalizePackageName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9-._~]/g, '-');
}

// 复制目录的通用函数
function copyDir(src: string, dest: string, projectName: string) {
  const normalizedName = normalizePackageName(projectName);
  
  // 创建目标目录
  fs.mkdirSync(dest, { recursive: true });
  
  // 读取源目录内容
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      // 递归复制子目录
      copyDir(srcPath, destPath, projectName);
    } else {
      // 读取文件内容
      let content = fs.readFileSync(srcPath, 'utf-8');
      
      // 替换项目名称
      content = content.replace(/{{projectName}}/g, normalizedName);
      
      // 写入新文件
      fs.writeFileSync(destPath, content, 'utf-8');
    }
  }
}

// 创建项目的通用函数
function createProject(projectPath: string, templateKey: TemplateKey, projectName: string) {
  const template = templates[templateKey];
  if (!template) {
    console.error(`错误: 模板 ${templateKey} 不存在`);
    process.exit(1);
  }

  console.log(`正在创建 ${template.name} 项目...`);
  
  // 获取模板目录路径
  const templatePath = path.join(__dirname, '../template', template.path);
  
  try {
    copyDir(templatePath, projectPath, projectName);
    console.log('模板复制完成!');
  } catch (error) {
    console.error('复制模板时出错:', error);
    process.exit(1);
  }
}

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
        choices: Object.entries(templates).map(([key, value]) => ({
          name: `${value.name} - ${value.description}`,
          value: key
        }))
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
    createProject(projectPath, answers.template as TemplateKey, projectName);

    // 初始化 Git 仓库
    if (answers.useGit) {
      console.log('初始化 Git 仓库...');
      // 这里可以添加 Git 初始化逻辑
    }

    console.log('项目创建完成!');
  });

program.parse(process.argv);