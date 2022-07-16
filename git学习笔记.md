# git学习

## 本篇笔记来由

这篇笔记是参考[廖雪峰git教程](https://www.liaoxuefeng.com/wiki/896043488029600/896202780297248)得来的，加上自己的理解能可以使自己更加充分得记住和理解知识点

## [常用git命令及简易流程](https://blog.csdn.net/weixin_43367262/article/details/100575221)

## 理解Git

如果你看过上一篇《[三歪给女朋友讲解什么是Git](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s%3F__biz%3DMzI4Njg5MDA5NA%3D%3D%26mid%3D2247489082%26idx%3D1%26sn%3Ddbdd2e6f59c4fac19fbbbb1870d2ca93%26chksm%3Debd7573bdca0de2d0d5556d2c652df5de7e66dbb137c878c026efbad319cc5cafdc3b8700aa5%26token%3D1038232507%26lang%3Dzh_CN%23rd)》应该能大概了解什么是Git了。

其实我觉得学Git主要理解`工作区` -> `暂存区`->`仓库` 这几个概念。



![img](https://pic4.zhimg.com/v2-ef519f67f476a2584573689a937ec603_b.jpg)



我们使用Git其实**绝大部分**的操作都是在**本地**上完成的，比如说`add 和commit`。

只有我们`push`的时候，才会把本地完成好的内容推到**远程仓库**上

通过上一篇文章我们知道在每个人的本地都有**完整的历史版本**，所以我们可以在本地就能**穿梭**到不同的版本，然后将修改之后的代码再重新提交到远程仓库上。

所谓的工作区实际上就是我们真正的的**本地目录**。

我们在本地添加文件后，需要`add`到暂存区，文件一旦被`add`到了暂存区，意味着Git能`追踪`到这个文件。

当我们修改到一定程度之后，我们会执行一次提交`commit`，在提交的时候我们会”**备注**“自己这次的提交修改了什么内容。

一次`commit`在Git就是一个版本，Git是版本控制的软件，我们可以随意穿梭到任何的版本中，修改代码。

暂存区是这么一个概念呢？

>  暂存区就像购物车，没到付款的时候你都不确定购物车里的东西全部都是要的。每拿一件商品就付一次款，那麻烦可大了。
>  

从宏观上看，Git其实有本地和远程的概念，只是本地又分了工作区、暂存区、本地仓库。再次强调：我们操作几乎都是在本地完成，**每个人的本地都会有所有历史版本信息**。



![img](https://pic3.zhimg.com/v2-0fce1fa4d2efd60161db7d4695015ee6_b.jpg)



我们一般会新建**分支**去支持每一次的修改。

其实分支这个概念也挺好理解的：我们需要**并行**开发，同时我们又不关心对方改的是什么内容，改的是什么文件。因此我们需要在自己的**专属环境**下去修改内容，只要把最终修改完后的内容合并到一个**主分支**就OK了。



![img](https://pic4.zhimg.com/v2-82dc51986de19362b00e2b23c74f3d7b_b.jpg)



假设三歪做完了，经过校验通过后，把自己的代码`merge`（合并）到`origin/master`分支后，然后就发布上线啦。

随后，鸡蛋也做完了，自己的分支校验完了以后，他此时也想把自己的代码合并到`origin/master`。不料，他改的代码跟三歪改的代码有冲突了（Git不知道选择谁的的代码），那鸡蛋只能手动`merge`了。

综合来看，我们使用Git大多数的场景就是**各自分支开发**，然后各自在本地`commit`（提交），最后汇总到`master`分支。



![img](https://pic4.zhimg.com/v2-3a42290ce662cbd79b1733a5990db44f_b.jpg)



所以，我们学Git大多数就学怎么实现**分支的增删改、切换以及版本的穿梭**。

>  学习Git的小tips：
>  Unix/Linux 命令中，`-` 后一般跟短命令选项（通常是单字母，也有一些命令是例外的），`--` 后一般跟长命令选项。如果只有一个单独的`--`，后面不紧跟任何选项，则表示命令选项结束，后续的都作为命令的参数而不是选项。
>  例如：`git checkout -- filename` `filename`作为`git checkout` 的参数，而不是选项。
>  

## 日常Git使用场景

**一**、如果这个项目的代码我们在本地还没有，我们先去GitLab里边找对应的Git地址，然后**Clone**到本地：

```text
git clone https://github.com/ZhongFuCheng3y/3y.git
```



![img](https://pic4.zhimg.com/v2-ad607512541482574960e317fb702703_b.jpg)



**二**、接到了新的需求，我们要**新建**一个分支，然后基于这个分支去开发：

```text
git checkout -b feature/sanwaiAddLog
```

在开发的时候，我们肯定会有两个操作：

- 在原来的基础上添加新的文件
- 在原有的文件上修改

**三**、不管怎么样，等我们做到一定程度了，我们都会提交代码。如果我们添加了新的文件，我们需要先`add`，然后再`commit`

```text
git add .
git commit  -m "try to commit files to GitHub, i am java3y"
```

**四**、假设我们一切顺利，在没人打扰的情况下已经写好了代码了，然后我们会把自己的分支`push`到远程仓库

```java
git push
```

**五**、假设我们写到一半，其他小伙伴已经把他的代码`merge`到主分支了，我们也需要把他最新的 代码给`pull`拉取下来（可以 git fetch + git merge 替代)。

```text
git pull
```

如果没有冲突，那git就会把他的代码给`merge`到我当前的分支上。如果有冲突，Git会提醒我去手动解决一下冲突。

**六**、假设我们写到一半了，现在工作区的代码都已经`commit`了。此时同事说要不帮忙一起排查一个问题，同事一般用的是**自己分支**，于是就得问他：你用的哪个分支啊？于是得把他的分支给拉下来，看看他的代码哪儿有问题

```text
git fecth -- 手动拉取远程仓库更新的信息
git checkout  分支名   -- 切换到他的分支
```

现在切换到他的分支，相当于你的环境跟他的环境是一模一样的，于是就可以愉快地一起看Bug了。

**七**、假设我们写到一半了，现在工作区的代码还没`commit`。现在有同事说要排查问题或者一个新的Bug被发现了，要紧急切换到其他的分支。现在我又不想`commit`（我就写了一半，编译还报着错误，没理由让我`commit`吧）。

这时，我会把工作区的代码先`stash`到暂存区给保存起来，然后就可以愉快地切换其他的分支了。

```text
git stash
```

等我解决完另一个bug或者帮别人看完问题了，我再把刚刚保存在暂存区的代码给捞出来，继续干活

```text
git stash pop
```

**八**、我一直在修Bug，现在的分支已经被我搞得人摸鬼样了，我非常难受，甚至不知道自己在这个过程中改了多少东西了。



![img](https://pic1.zhimg.com/v2-17801c6b808b474e842f4678971055d4_b.jpg)



思路已经完全被打乱了，我想回到一个稳定的`commit`重新出发，重来吧（通过下面的命令，把工作区的代码都改成对应commit的代码了）。

```text
git reset --hard  版本号
```

那我怎么找到版本号呢？Git也是有日志的：

```text
git log --pretty=oneline
```



![img](https://pic2.zhimg.com/v2-83ba47e2131a4f033c2f9e5dff3cf3c5_b.jpeg)



## 常用的Git命令

查看Git工作区、暂存区的变更情况（可以知道哪些没有commit、哪些没有被Git追踪）：`git status`

拉取远程最新的变更到本地：`git fetch`

切换分支：`git checkout 分支名`

将代码还原到某个版本(包括工作目录)：`git reset --hard 版本号`

查看Git的提交(commit)记录：`git log`

将代码还原到某个版本后，后悔了，想重新回去，但在提交记录已经找不到了。`git reset --hard` 把`reset 之后的 commit`都给抹杀掉了。找到最近的执行Git命令：`git reflog`

还原到某个版本了，现在我为了稳健，不想再原来的分支上修改了，再**新建一个分支**吧（`-b` 参数把当前分支切换到了要创建的分支上）：`git checkout -b 分支名`

我们把上一次还是”相对稳健“的分支合并到我新建的分支上：`git merge 分支`

突然想看看现在有多少个分支：`git branch -a`

新增几个文件了，随手`git add`一下吧

改得差不多了，随手`git commit -m`一下吧，最好还是**写好备注**，不然以后等改多了，你都不知道你改了什么啦。

改完了，提交到远程吧：`git push`

想把远程分支最新的代码给拉下来，然后合并到本地上。我们可以用`git fetch`和`git merge`来实现，也可以通过`git pull`来实现。一般我用的都是`git fetch`+`git merge`，这样会更加**可控**一些

有的时候，本地分支在master分支，然后忘了切其他的分支去修改，直接在master改了，然后也push到远程了。等你发现的时候，你会真的想骂自己。

咋办？最简单的办法其实我们还是可以`git reset --hard`到对应的版本，然后将其修改或者复原，再强制提交到`master`分支：`git push -u origin/master -f`

## 本地仓库

### 暂存add

当工作区相较于上个版本（上次commit）有修改又要`commit`的时候，**必须**要把修改的文件添加（`add`）到**暂存区**才能`commit`

如果只是对自己的文本文件进行版本管理（而不是团队协作），Git鼓励你使用分支完成某个任务，合并后再删掉分支，这和直接在`master`分支上工作（一直使用`commit`操作产生的不同版本）效果是一样的，但过程更安全。

### 提交commit

每`commit`一次（带有更改版本的信息`git commit -m "string"`）就算一个版本

### HEAD

在Git中，用`HEAD`指针指向当前版本，你让`HEAD`指向哪个版本号，你就把当前版本定位在哪。

### [版本回退](https://www.liaoxuefeng.com/wiki/896043488029600/897013573512192)

#### `git reset`

- `HEAD`指向的版本就是当前版本，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。
- 穿梭前，用`git log`可以查看提交历史（当前版本之前的所有**提交**记录），以便确定要回退到哪个版本。
- 要重返未来，用`git reflog`查看命令历史（**所有的命令历史**，包含所有的提交历史、切换分支历史），以便确定要回到未来的哪个版本。

### 撤销修改

当文件已修改但想撤销修改，相应情景和做法如下：

- 工作区修改了但**未添加**到暂存区，**未提交**到本地仓库。改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。
- 当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。
- 已经提交了不合适的修改到版本库时，想要撤销本次提交，参考[版本回退](https://www.liaoxuefeng.com/wiki/896043488029600/897013573512192)一节，进行版本回退，不过前提是没有推送到远程库。





## 分支

分支分本地分支与远程分支

### 本地分支

### 合并分支

`git merge devTemp`是devTemp分支**合并到当前**执行这条语句的**分支**上

### 产生冲突conflicts

#### 原因

两个分支对文本同一处地方修改情况不同，不是有与没有的差异，而是内容1与内容2文本内容之间的差异导致

#### current changes与incoming changes

当B分支合并到A分支：

current changes是A分支的修改，incoming changes是B分支的修改

current changes是当前工作区的修改，incoming changes是merge的来源

##### github上的解释

It depends on the type of operation ([merge or rebase](https://stackoverflow.com/a/7062773/6309)) leading to that conflict.

In your case, a merge, where:

- current change represents what you have (the **destination** of the merge)
- incoming change represents what you merge (the **source** of the merge)

Then:

- Option 1 ("Accept Incoming changes") would ignore completely what you had, and keep what you merge.
- Option 2 ("Accept current changes") would ignore completely what you merge, and keep what you had.

Don't forget, in case of a rebase, ["what you have" and "what you merge" are reversed](https://stackoverflow.com/a/2960751/6309).

## 远程仓库

当你从远程仓库克隆时，Git自动把**本地**的`master`分支和**远程**的`master`分支对应起来了，并且，远程仓库的默认名称是`origin`。

### 推送分支

推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定**本地分支**，这样，Git就会把**该分支推送到远程库对应的远程分支**上

### 注意

- `master`分支是主分支，因此要时刻与远程同步；
- `dev`分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

# 其他知识点

## 遇到的问题

### [git无法pull仓库refusing to merge unrelated histories](https://blog.csdn.net/lindexi_gd/article/details/52554159)

如果合并了两个**不同的**开始提交的仓库，在新的 git 会发现这两个仓库可能不是同一个，为了防止开发者上传错误，于是就给下面的提示

fatal: refusing to merge unrelated histories

如我在Github新建一个仓库，**写了License，然后把本地一个写了很久仓库上传**。这时会发现 github 的仓库和本地的没有一个共同的 commit 所以 git 不让提交，认为是写错了 origin ，如果开发者确定是这个 origin 就可以使用 --allow-unrelated-histories 告诉 git 自己确定

## 集中式系统与分布式系统

### **集中式系统**

集中式系统用一句话概括就是：**一个主机带多个终端**。终端没有**数据处理能力**，仅负责数据的**录入和输出**。而**运算、存储**等全部在**主机**上进行。现在的银行系统，大部分都是这种集中式的系统，此外，在大型企业、科研单位、军队、政府等也有分布。集中式系统，主要流行于上个世纪。<img src="https://www.liaoxuefeng.com/files/attachments/918921540355872/l" alt="central-repo" style="zoom:80%;" />

### **分布式系统**

分布式版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样，你工作的时候，就不需要联网了，因为版本库就在你自己的电脑上。既然每个人电脑上都有一个完整的版本库，那多个人如何协作呢？比方说你在自己电脑上改了文件A，你的同事也在他的电脑上改了文件A，这时，你们俩之间只需把各自的**修改**推送给对方，就可以互相看到对方的修改了。

和集中式版本控制系统相比，分布式版本控制系统的安全性要高很多，因为**每个人电脑里都有完整的版本库**，某一个人的电脑坏掉了不要紧，随便从其他人那里复制一个就可以了。而集中式版本控制系统的中央服务器要是出了问题，所有人都没法干活了。

在实际使用分布式版本控制系统的时候，其实很少在两人之间的电脑上推送版本库的修改，因为可能你们俩不在一个局域网内，两台电脑互相访问不了，也可能今天你的同事病了，他的电脑压根没有开机。因此，分布式版本控制系统通常也有一台充当“中央服务器”的电脑，但这个服务器的作用仅仅是用来方便**“交换”**大家的修改，没有它大家也一样干活，只是交换修改不方便而已。<img src="https://www.liaoxuefeng.com/files/attachments/918921562236160/l" alt="distributed-repo" style="zoom:80%;" />



## [文本文件与二进制文件的区别](https://www.cnblogs.com/zhangjiankun/archive/2011/11/27/2265184.html#:~:text=%E5%A4%A7%E5%AE%B6%E9%83%BD%E7%9F%A5%E9%81%93%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%9A%84%E5%AD%98%E5%82%A8%E5%9C%A8%E7%89%A9%E7%90%86%E4%B8%8A%E6%98%AF%E4%BA%8C%E8%BF%9B%E5%88%B6%E7%9A%84%EF%BC%8C%E6%89%80%E4%BB%A5%E6%96%87%E6%9C%AC%E6%96%87%E4%BB%B6%E4%B8%8E%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%8C%BA%E5%88%AB%E5%B9%B6%E4%B8%8D%E6%98%AF%E7%89%A9%E7%90%86%E4%B8%8A%E7%9A%84%EF%BC%8C%E8%80%8C%E6%98%AF%E9%80%BB%E8%BE%91%E4%B8%8A%E7%9A%84%E3%80%82.%20%E8%BF%99%E4%B8%A4%E8%80%85%E5%8F%AA%E6%98%AF%E5%9C%A8%E7%BC%96%E7%A0%81%E5%B1%82%E6%AC%A1%E4%B8%8A%E6%9C%89%E5%B7%AE%E5%BC%82%E3%80%82.%20%E7%AE%80%E5%8D%95%E6%9D%A5%E8%AF%B4%EF%BC%8C%E6%96%87%E6%9C%AC%E6%96%87%E4%BB%B6%E6%98%AF%E5%9F%BA%E4%BA%8E%E5%AD%97%E7%AC%A6%E7%BC%96%E7%A0%81%E7%9A%84%E6%96%87%E4%BB%B6%EF%BC%8C%E5%B8%B8%E8%A7%81%E7%9A%84%E7%BC%96%E7%A0%81%E6%9C%89ASCII%E7%BC%96%E7%A0%81%EF%BC%8CUNICODE%E7%BC%96%E7%A0%81%E7%AD%89%E7%AD%89%E3%80%82.%20%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%96%87%E4%BB%B6%E6%98%AF%E5%9F%BA%E4%BA%8E%E5%80%BC%E7%BC%96%E7%A0%81%E7%9A%84%E6%96%87%E4%BB%B6%EF%BC%8C%E4%BD%A0%E5%8F%AF%E4%BB%A5%E6%A0%B9%E6%8D%AE%E5%85%B7%E4%BD%93%E5%BA%94%E7%94%A8%EF%BC%8C%E6%8C%87%E5%AE%9A%E6%9F%90%E4%B8%AA%E5%80%BC%E6%98%AF%E4%BB%80%E4%B9%88%E6%84%8F%E6%80%9D%EF%BC%88%E8%BF%99%E6%A0%B7%E4%B8%80%E4%B8%AA%E8%BF%87%E7%A8%8B%EF%BC%8C%E5%8F%AF%E4%BB%A5%E7%9C%8B%E4%BD%9C%E6%98%AF%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BC%96%E7%A0%81%E3%80%82.,%E4%BB%8E%E4%B8%8A%E9%9D%A2%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%87%BA%E6%96%87%E6%9C%AC%E6%96%87%E4%BB%B6%E5%9F%BA%E6%9C%AC%E4%B8%8A%E6%98%AF%E5%AE%9A%E9%95%BF%E7%BC%96%E7%A0%81%E7%9A%84%20%28%E4%B9%9F%E6%9C%89%E9%9D%9E%E5%AE%9A%E9%95%BF%E7%9A%84%E7%BC%96%E7%A0%81%E5%A6%82UTF-8%29%E3%80%82.%20%E8%80%8C%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%96%87%E4%BB%B6%E5%8F%AF%E7%9C%8B%E6%88%90%E6%98%AF%E5%8F%98%E9%95%BF%E7%BC%96%E7%A0%81%E7%9A%84%EF%BC%8C%E5%9B%A0%E4%B8%BA%E6%98%AF%E5%80%BC%E7%BC%96%E7%A0%81%E5%98%9B%EF%BC%8C%E5%A4%9A%E5%B0%91%E4%B8%AA%E6%AF%94%E7%89%B9%E4%BB%A3%E8%A1%A8%E4%B8%80%E4%B8%AA%E5%80%BC%EF%BC%8C%E5%AE%8C%E5%85%A8%E7%94%B1%E4%BD%A0%E5%86%B3%E5%AE%9A%E3%80%82.%20)

因为文本文件与二进制文件的区别仅仅是编码上不同，所以他们的优缺点就是编码的优缺点，这个找本编码的书来看看就比较清楚了。一般认为，文本文件编码基于字符定长，译码容易些；二进制文件编码是变长的，所以它灵活，存储利用率要高些，译码难一些（不同的二进制文件格式，有不同的译码方式）。关于空间利用率，想想看，二进制文件甚至可以用一个比特来代表一个意思(位操作)，而文本文件任何一个意思至少是一个字符．

在windows下,文本文件不一定是一ASCII来存贮的,因为ASCII码只能表示128的标识,你打开一个txt文档,然后另存为,有个选项是编码,可以选择存贮格式,一般来说UTF-8编码格式兼容性要好一些.而二进制用的计算机原始语言,不存贮兼容性.  很多书上还认为，文本文件的可读性要好些，存储要花费转换时间(读写要编译码)，而二进制文件可读性差，存储不存在转换时间（读写不要编解码，直接写值）．这里的可读性是从软件使用者角度来说的，因为我们用通用的记事本工具就几乎可以浏览所有文本文件，所以说文本文件可读性好；而读写一个具体的二进制文件需要一个具体的文件解码器，所以说二进制文件可读性差，比如读BMP文件，必须用读图软件．



## x86与x64

x86形容32位操作系统，x64形容64位操作系统

## 