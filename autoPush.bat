@echo
@bat自动循环提交

set path=%path%;C:\Program Files\Git\cmd


replace config .git

git add .
git commit -am "description"
git push -u

echo done...

pause