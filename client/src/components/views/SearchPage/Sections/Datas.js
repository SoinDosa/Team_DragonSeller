const price= [
    {
        
        "_id": 0,
        "name": "Any",
        "array":[]
    },
    {
        "_id": 1,
        "name": "~500$",
        "array":[0,500]
    },
    {
        "_id": 2,
        "name": "500$~1000$",
        "array":[501,1000]
    },
    {
        "_id": 3,
        "name": "1000$~2000$",
        "array":[1001,2000]
    },
    {
        "_id": 4,
        "name": "2000$~3000$",
        "array":[2001,3000]
    },
    {
        "_id": 5,
        "name": "3000$~4000$",
        "array":[3001,4000]
    },
    {
        "_id": 6,
        "name": "4000$이상",
        "array":[4001,1000000]
    }
]

const computerPart = [
    {
        "_id": 1,
        "name": "CPU",
    },
    {
        "_id": 2,
        "name": "GPU",
    },
    {
        "_id": 3,
        "name": "MOTHERBOARD",
    },
    {
        "_id": 4,
        "name": "RAM",
    },
    {
        "_id": 5,
        "name": "SSD",
    },
    {
        "_id": 6,
        "name": "HDD",
    },
    {
        "_id": 7,
        "name": "POWER",
    },{
        "_id": 8,
        "name": "CASE",
    }
]


const sortBy = [
    {
        "_id": 1,
        "order":-1,
        "name": "신상품순"
    },
    {
        "_id": 2,
        "order": 1,
        "name": "낮은가격순"
    },
    {
        "_id": 3,
        "order": -1,
        "name": "높은가격순"
    },
]
const payment = [
    {
        "_id": 1,
        "order":-1,
        "name": "가장최근주문된"
    },
    {
        "_id": 2,
        "order": 1,
        "name": "이름순"
    },
    {
        "_id": 3,
        "order": -1,
        "name": "역순"
    },
]
const bannerPart = [
    {
        "_id" : 1,
        "name": "공지사항"
    },
    {
        "_id" : 2,
        "name": "이벤트"
    }
]
const sortTime = [
    {
        "_id" : 1,
        "name" : "최신순",
    },
    {
        "_id" : 2,
        "name": "가장오래된"
    }
]
export {
    price,
    computerPart,
    sortBy,
    payment,
    bannerPart,
    sortTime
}