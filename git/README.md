
# git命令
```

git add . // 将工作区所有文件内容添加到暂存区
git restore . // 将暂存区内容覆盖到当前
git rm --cache 文件路径 // 删除暂存区某文件内容

git reset // 取消暂存区所有内容（不加后面的版本号）

```

# 文件状态：
1. U 未跟踪
2. A 新添加
3. M 已修改
4 '' 空，未修改

```
git status -s // 当前文件状态
// 输出： MM xxx 文件 ； 
//  第一个M 在暂存区状态 第二个M 工作区状态
```


# git回退版本（版本已在仓库）的3种模式
```
git log --online // 查看提交历史

git reset --soft 版本号 // 保留工作区，暂存区为跟踪文件。 其他已有文件覆盖

git reset --hard 版本号 // 全覆盖，不做任何保留

git reset 版本号 // 保留工作区，不保留暂存区。 与 git reset --mixed 等价

```