const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

let boards = [
    {
        id: 1,
        displayId: 1,
        title: "title1",
        content: "content1",
        createdAt: "2025-08-01"
    },
    {
        id: 2,
        displayId: 2,
        title: "title2",
        content: "content2",
        createdAt: "2025-08-02"
    },
    {
        id: 3,
        displayId: 3,
        title: "title3",
        content: "content3",
        createdAt: "2025-08-03"
    },
]

let initId = 4

app.post("/boards", (req, res) => {
    try {
        const newBoard = {
            id: initId++,
            displayId: boards.length + 1,
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date().toISOString()
        }
        boards.push(newBoard)
        res.status(201).json({ message: "생성 완료", boards })
    } catch (error) {
        console.error("생성 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})

app.get("/boards", (req, res) => {
    try {
        res.status(200).json({
            message: "가져오기 성공",
            boards
        })
    } catch (error) {
        console.error("조회 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})

app.get("/boards/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(b => b.id === boardId)
        if (index === -1) {
            return res.status(404).json({ message: "사용자 없음" })
        }
        res.status(200).json({ message: "조회 완료", board: boards[index] })
    } catch (error) {
        console.error("조회 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})

app.put("/boards/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(b => b.id === boardId)
        if (index === -1) {
            return res.status(404).json({ message: "사용자 없음" })
        }
        const update = req.body
        boards[index] = {
            ...boards[index],
            ...update
        }
        res.status(200).json({ message: "조회 완료", board: boards[index] })
    } catch (error) {
        console.error("조회 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})

app.delete("/boards/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(b => b.id === boardId)
        if (index === -1) {
            return res.status(404).json({ message: "사용자 없음" })
        }
        boards.splice(index, 1)
        res.status(201).json({ message: "삭제 완료", boards })
    } catch (error) {
        console.error("조회 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})

app.patch("/boards/:id/title", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(b => b.id === boardId)
        if (index === -1) {
            res.status(404).json({ message: "게시글 수정 중 아이디 없음" })
        }
        const { title } = req.body
        if (typeof title !== 'string' || title.trim() === "") {
            return res.status(400).json({
                message: "타이틀은 비어있지 않아야 함."
            })
        }
        boards[index] = {
            ...boards[index],
            title: title.trim()
        }
        res.status(200).json({ message: "제목 수정 완료", board: boards[index] })
    } catch (error) {
        console.error("제목 수정 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})

app.patch("/boards/:id/content", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(b => b.id === boardId)
        if (index === -1) {
            res.status(404).json({ message: "게시글 수정 중 아이디 없음" })
        }
        const { content } = req.body
        if (typeof content !== 'string' || content.trim() === "") {
            return res.status(400).json({
                message: "컨텐츠는 비어있지 않아야 함"
            })
        }
        boards[index] = {
            ...boards[index],
            content: content.trim()
        }
        res.status(200).json({ message: "내용 수정 완료", board: boards[index] })
    } catch (error) {
        console.error("내용 수정 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})


app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(PORT, () => {
    console.log("Server run")
})