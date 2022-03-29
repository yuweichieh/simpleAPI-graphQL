const { buildSchema } = require('graphql')

const Schemagql = buildSchema(`
  type _person {
    pcd_flag: String
    addresses: [_address]
    deceased: String
    ethnicity: [_ethnicity]
    name_n: String
    has_emeritus: String
    birth_date: String
    ferpa: String
    affiliations: [_affiliation]
    sims: String
    kmdata: String
    continuous_service_date: String
    orig_hire_date: String
    name_prefix: String
    worker_type: String
    pref_first_name: String
    on_leave: String
    first_name: String
    appointments: [_appointment]
    incomplete_transcripts: [_transcriptUserid]
    sex: String
    last_hire_date: String
    active: String
    last_name: String
    pref_last_name: String
    os_osu_start_dt: String
    busn_address: [_busn_address]
    emplid: String
    kmdataid: String
    phone_numbers: [_phone_number]
    WID: String
    email_addrs: [_email_addr]
    is_retiree: String
    name: String
    hispanic_or_latino: String
    academic_info: [_academic_info]
    osf_paid_fees: String
    idmuid: String
    md5: String
  }

  type _address {
    country: String
    address_type: String
    address3: String
    address2: String
    city: String
    address1: String
    address4: String
    state: String
    postal: String
  }

  type _ethnicity {
    ethnic_descr: String
  }

  type _affiliation {
    affiliation: String
  }

  type _appointment {
    empl_status: String
    class_descr: String
    superior_location: String
    reports_to_idmuid: String
    deptid: String
    supervisor_name: String
    dlevel_descr: String
    std_hours: String
    paygroup: String
    empl_title: String
    reports_to_emplid: String
    empl_class: String
    class_defn_descr: String
    reports_to_email: String
    vp_college: String
    position_nbr: String
    dlevel: String
    class_indc: String
    report_to_name: String
    employee_type: String
    full_part_time: String
    os_fte_percent: String
    posn_descr: String
    comp_frequency: String
    deptid_descr: String
    jobcode: String
    vp_college_descr: String
    location: String
    position_reference_id: String
  }

  type _busn_address {
    city: String
    address1: String
    state: String
    postal: String
  }

  type _phone_number {
    country_code: String
    phone_type: String
    phone: String
    pref_phone_flag: String
    device_type: String
  }

  type _email_addr {
    email_address: String
    email_addr_type: String
  }

  type _academic_info {
    emplid: String
    acad_career: String
    programs: [_programs]
    enrollment_status: String
  }

  type _programs {
    primary_program: String
    program_campus: String
    acad_prog: String
    admit_term: String
    plans: [_plans]
    acad_level_bot: String
    acad_prog_descr: String
    home_campus: String
    acad_level_eot: String
    stdnt_car_nbr: Int
  }

  type _plans {
    acad_plan: String
    acad_plan_descr: String
    acad_plan_type: String
  }

  type Query {
    getAllPerson: [_person]
    getPersonByArg(argType: String!, arg: String!): [_person]
  }

  type _transcriptUserid {
    idmuid: String
    emplid: String
    cornerstoneid: Int
    cost_center_id: String
    manager: String
    lo_title: String
    lo_version: String
    lo_type: String
    user_lo_create_dt: String
    user_lo_comp_dt: String
    user_lo_assign_dt: String
    user_lo_reg_dt: String
    user_lo_pass: Int
    is_latest_version_on_transcript: Boolean
  }
`)

module.exports = Schemagql
