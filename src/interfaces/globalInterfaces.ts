import { AlertColor } from '@mui/material'

export interface UserObjectProps {
    id?: string
    username?: string
};

export interface UserObjectPropsPrivate extends UserObjectProps {
    email?: string
    password?: string
    first_name?: string
    last_name?: string
};

export interface GroupUserObjectProps extends UserObjectProps {
    group?: GroupObjectProps
    roles?: Array<GroupRoleProps>
};

export interface UserLoginProps {
    username?: string
    password?: string
};

export interface GroupObjectProps {
    id?: string
    public?: boolean
    name?: string
    image?: string
    headline?: string
    description?: string
};

export interface RoomObjectProps {
    id?: string
    public?: boolean
    name?: string
    category: string
    image?: string
    headline?: string
    description?: string
    group?: GroupObjectProps
    user?: UserObjectProps
};

export interface EquipObjectProps {
    id?: string
    public?: boolean
    name?: string
    configuration?: string
    category: string
    image?: string
    headline?: string
    description?: string
    group?: GroupObjectProps
    user?: UserObjectProps
    room?: RoomObjectProps
};


export interface EquipConfigurationProps {
    equiptype?: string
    telemetryconfig?: EquipTelemetryChannels
    analoginputs?: EquipAnalogInputChannels
    analogoutputs?: EquipAnalogOutputChannels
    digitalinputs?: EquipDigitalInputChannels
    digitaloutputs?: EquipDigitalOutputChannels
};

interface EquipTelemetryChannels {
    ch001?: EquipTelemetryProps
    ch002?: EquipTelemetryProps
    ch003?: EquipTelemetryProps
    ch004?: EquipTelemetryProps
    ch005?: EquipTelemetryProps
};

interface EquipTelemetryProps {
    protocol?: string
    channelid?: string
};

interface EquipAnalogInputChannels {
    ch001?: EquipAnalogInputProps
    ch002?: EquipAnalogInputProps
    ch003?: EquipAnalogInputProps
    ch004?: EquipAnalogInputProps
    ch005?: EquipAnalogInputProps
    ch006?: EquipAnalogInputProps
    ch007?: EquipAnalogInputProps
    ch008?: EquipAnalogInputProps
    ch009?: EquipAnalogInputProps
    ch010?: EquipAnalogInputProps
    ch011?: EquipAnalogInputProps
    ch012?: EquipAnalogInputProps
    ch013?: EquipAnalogInputProps
    ch014?: EquipAnalogInputProps
    ch015?: EquipAnalogInputProps
    ch016?: EquipAnalogInputProps
    ch017?: EquipAnalogInputProps
    ch018?: EquipAnalogInputProps
    ch019?: EquipAnalogInputProps
    ch020?: EquipAnalogInputProps
    ch021?: EquipAnalogInputProps
    ch022?: EquipAnalogInputProps
    ch023?: EquipAnalogInputProps
    ch024?: EquipAnalogInputProps
    ch025?: EquipAnalogInputProps
    ch026?: EquipAnalogInputProps
    ch027?: EquipAnalogInputProps
    ch028?: EquipAnalogInputProps
    ch029?: EquipAnalogInputProps
    ch030?: EquipAnalogInputProps
    ch031?: EquipAnalogInputProps
    ch032?: EquipAnalogInputProps
};

interface EquipAnalogInputProps {
    identifier?: string
    description?: string
    telemetrychannel?: string
    telemeteryid?: string
    dataformat?: string
    scalingfactor?: string
    uom?: string
    inrangehigh?: string
    inrangelow?: string
    displayrangehigh?: string
    displayrangelow?: string
    invaluedisplay?: string
    invalueraw?: string
};

interface EquipAnalogOutputChannels {
    ch001?: EquipAnalogOutputProps
    ch002?: EquipAnalogOutputProps
    ch003?: EquipAnalogOutputProps
    ch004?: EquipAnalogOutputProps
    ch005?: EquipAnalogOutputProps
    ch006?: EquipAnalogOutputProps
    ch007?: EquipAnalogOutputProps
    ch008?: EquipAnalogOutputProps
    ch009?: EquipAnalogOutputProps
    ch010?: EquipAnalogOutputProps
    ch011?: EquipAnalogOutputProps
    ch012?: EquipAnalogOutputProps
    ch013?: EquipAnalogOutputProps
    ch014?: EquipAnalogOutputProps
    ch015?: EquipAnalogOutputProps
    ch016?: EquipAnalogOutputProps
    ch017?: EquipAnalogOutputProps
    ch018?: EquipAnalogOutputProps
    ch019?: EquipAnalogOutputProps
    ch020?: EquipAnalogOutputProps
    ch021?: EquipAnalogOutputProps
    ch022?: EquipAnalogOutputProps
    ch023?: EquipAnalogOutputProps
    ch024?: EquipAnalogOutputProps
    ch025?: EquipAnalogOutputProps
    ch026?: EquipAnalogOutputProps
    ch027?: EquipAnalogOutputProps
    ch028?: EquipAnalogOutputProps
    ch029?: EquipAnalogOutputProps
    ch030?: EquipAnalogOutputProps
    ch031?: EquipAnalogOutputProps
    ch032?: EquipAnalogOutputProps
};

interface EquipAnalogOutputProps {
    identifier?: string
    description?: string
    telemetrychannel?: string
    telemeteryid?: string
    dataformat?: string
    uom?: string
    displayrangehigh?: string
    displayrangelow?: string
    outvaluedisplay?: string
    outrangehigh?: string
    outrangelow?: string
    outvalueraw?: string
};

interface EquipDigitalInputChannels {
    ch001?: EquipDigitalInputProps
    ch002?: EquipDigitalInputProps
    ch003?: EquipDigitalInputProps
    ch004?: EquipDigitalInputProps
    ch005?: EquipDigitalInputProps
    ch006?: EquipDigitalInputProps
    ch007?: EquipDigitalInputProps
    ch008?: EquipDigitalInputProps
    ch009?: EquipDigitalInputProps
    ch010?: EquipDigitalInputProps
    ch011?: EquipDigitalInputProps
    ch012?: EquipDigitalInputProps
    ch013?: EquipDigitalInputProps
    ch014?: EquipDigitalInputProps
    ch015?: EquipDigitalInputProps
    ch016?: EquipDigitalInputProps
    ch017?: EquipDigitalInputProps
    ch018?: EquipDigitalInputProps
    ch019?: EquipDigitalInputProps
    ch020?: EquipDigitalInputProps
    ch021?: EquipDigitalInputProps
    ch022?: EquipDigitalInputProps
    ch023?: EquipDigitalInputProps
    ch024?: EquipDigitalInputProps
    ch025?: EquipDigitalInputProps
    ch026?: EquipDigitalInputProps
    ch027?: EquipDigitalInputProps
    ch028?: EquipDigitalInputProps
    ch029?: EquipDigitalInputProps
    ch030?: EquipDigitalInputProps
    ch031?: EquipDigitalInputProps
    ch032?: EquipDigitalInputProps
};

interface EquipDigitalInputProps {
    identifier?: string
    description?: string
    telemetrychannel?: string
    telemeteryid?: string
    displaytexthigh?: string
    displaytextlow?: string
    invalueraw?: string
};

interface EquipDigitalOutputChannels {
    ch001?: EquipDigitalOutputProps
    ch002?: EquipDigitalOutputProps
    ch003?: EquipDigitalOutputProps
    ch004?: EquipDigitalOutputProps
    ch005?: EquipDigitalOutputProps
    ch006?: EquipDigitalOutputProps
    ch007?: EquipDigitalOutputProps
    ch008?: EquipDigitalOutputProps
    ch009?: EquipDigitalOutputProps
    ch010?: EquipDigitalOutputProps
    ch011?: EquipDigitalOutputProps
    ch012?: EquipDigitalOutputProps
    ch013?: EquipDigitalOutputProps
    ch014?: EquipDigitalOutputProps
    ch015?: EquipDigitalOutputProps
    ch016?: EquipDigitalOutputProps
    ch017?: EquipDigitalOutputProps
    ch018?: EquipDigitalOutputProps
    ch019?: EquipDigitalOutputProps
    ch020?: EquipDigitalOutputProps
    ch021?: EquipDigitalOutputProps
    ch022?: EquipDigitalOutputProps
    ch023?: EquipDigitalOutputProps
    ch024?: EquipDigitalOutputProps
    ch025?: EquipDigitalOutputProps
    ch026?: EquipDigitalOutputProps
    ch027?: EquipDigitalOutputProps
    ch028?: EquipDigitalOutputProps
    ch029?: EquipDigitalOutputProps
    ch030?: EquipDigitalOutputProps
    ch031?: EquipDigitalOutputProps
    ch032?: EquipDigitalOutputProps
};

interface EquipDigitalOutputProps {
    identifier?: string
    description?: string
    telemetrychannel?: string
    telemeteryid?: string
    displaytexthigh?: string
    displaytextlow?: string
    outvalueraw?: string
};

interface EquipRoomControlMap {
    key_w: EquipRoomControlProps
    key_a: EquipRoomControlProps
    key_s: EquipRoomControlProps
    key_d: EquipRoomControlProps
    key_q: EquipRoomControlProps
    key_e: EquipRoomControlProps
    key_arrowup: EquipRoomControlProps
    key_arrowdn: EquipRoomControlProps
    key_arrowlf: EquipRoomControlProps
    key_arrowrg: EquipRoomControlProps
    key_1: EquipRoomControlProps
    key_2: EquipRoomControlProps
    key_3: EquipRoomControlProps
    key_4: EquipRoomControlProps
    key_5: EquipRoomControlProps
    key_6: EquipRoomControlProps
    key_7: EquipRoomControlProps
    key_8: EquipRoomControlProps
    key_9: EquipRoomControlProps
    key_0: EquipRoomControlProps
    key_r: EquipRoomControlProps
    key_f: EquipRoomControlProps
    key_z: EquipRoomControlProps
    key_x: EquipRoomControlProps
    key_c: EquipRoomControlProps
    key_v: EquipRoomControlProps
};

interface EquipRoomControlProps {
    displaytext?: string
    description?: string
    useoutputchannel?: boolean
    outputchanneltype?: boolean
    outputchannelid?: string
    outputchannelvalue?: string
    telemetrychannel?: string
    telemeteryid?: string
    telemetryoutput?: string
};

export interface GroupRoleProps {
    id?: string
    name?: string
    permissions?: Array<GroupPermissionProps>
};


export interface GroupPermissionProps {
    id?: string
    name?: string
};

export interface AlertValueObjectProps {
    open: boolean
    content: string
    severity: AlertColor | undefined
};

export interface QueryStringFilterProps {
    key: string
    value: string
};