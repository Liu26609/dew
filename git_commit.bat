@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo.
echo ==========================================
echo           Git 自动提交脚本
echo ==========================================
echo.

REM 检查是否在git仓库中
git status > nul 2>&1
if errorlevel 1 (
    echo ❌ 错误：当前目录不是git仓库！
    pause
    exit /b 1
)

echo 📋 当前git状态：
echo.
git status --short
echo.

REM 添加所有文件（包括删除的文件）
echo 📦 正在添加所有文件到暂存区...
git add -A

echo.
echo 📝 请输入本次提交的commit信息：
set /p commit_msg=

REM 检查是否输入了commit信息
if "%commit_msg%"=="" (
    echo ❌ 错误：commit信息不能为空！
    pause
    exit /b 1
)

echo.
echo 🚀 正在提交代码...
git commit -m "%commit_msg%"

if errorlevel 1 (
    echo ❌ 提交失败！
    pause
    exit /b 1
)

echo ✅ 代码提交成功！
echo.

echo 📤 正在推送到远程仓库...
git push

if errorlevel 1 (
    echo ❌ 推送失败！可能需要先拉取远程更新或解决冲突
    echo 💡 建议手动执行：git pull 然后 git push
) else (
    echo ✅ 推送成功！
)
echo.
echo 🎉 操作完成！
echo.
pause 