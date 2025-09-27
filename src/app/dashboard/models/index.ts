



export interface Items {
    
    _id: string;
    code:string;
    facility_key: string;
    name: string;
    nup: string;
    qty: number;
    desc: string;
    division_key: string;
    status: "A" | "R" | "B" ; // A ; available, R : Repair, T : tidak digunakan
    isDeleted: boolean;

}
export interface Report{
    _id: string,
    report_code: string,
    employee_key: string,
    facility_key: string,
    division_key: Division,
    repair : IRepair,
    report_type: "BK" | "M" | "BL";
    broken_type: "R" | "S" | "B";
    progress: "A" | "P" | "S" | "T";
    complain_des: string,
    broken_des: string,
    status: boolean,
    admin_note: string,
    image: string
}

export interface IRepair {
    price : number,
    note: string,
    createdAt: Date
}

export interface facilities {
        facility: string;
        items: string;
}
export interface FacilityEmployee {
    division : {
        facility: string;
        aset: string
        items: string;
    }
}


export interface Division {
    _id:string
    name : string;
    code : string;
    desc: string;
    status: boolean
    refresh_token: string;
    createAt : number;
    creatorId: string;
    employee_key: Employee [];    
    item_key: Items [];    
}


export interface Division_key {
    name: string;
    code: string;
    item_key: never[];
    _id : Division
}

export interface Employee  {

    _id: string;
    status: 'A' | 'B' | 'P';
    division_key: Division_key[] | [];
    user_id : string
    username : string;
    password: string;
    email : string;
    phone : number;
    role: 'E' | 'H1' | 'H2';
    refresh_token: string;
    createAt : number;
    creatorId: string;    
    
}

export interface EmployeeMappingAddReport  {

    _id: string;
    status: 'A' | 'B' | 'P';
    division_key: Division[] | [];
    user_id : string
    username : string;
    password: string;
    email : string;
    phone : number;
    role: 'E' | 'H1' | 'H2';
    refresh_token: string;
    createAt : number;
    creatorId: string;    
    
}

export interface Facility {
    _id:string;
    name: string;
    code: string;
    status: "good" | "warning" | "alert";
}


interface Room {
    name: string,
    code: string,
    price: number,
    facility: Facility[],
    status: boolean,
    customer_key: string,
    report_id: string,
    image: string
}



// Definisikan tipe data untuk form
