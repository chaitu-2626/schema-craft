export enum DatabaseType {
    MySQL = 'mysql',
    PostgreSQL = 'postgresql',
    SQLServer = 'sqlserver'
}

export enum IndexType {
    Primary = 'primary',
    Unique = 'unique',
    Index = 'index',
    None = 'none'
}

export enum RelationshipType {
    OneToOne = '1:1',
    OneToMany = '1:n',
    ManyToOne = 'n:1',
    None = 'none'
}

export enum DiagramVisibility {
    Public = 'public',
    Private = 'private'
}

export enum MySQLDataType {
    // Numeric Types
    TINYINT = 'TINYINT',
    SMALLINT = 'SMALLINT',
    MEDIUMINT = 'MEDIUMINT',
    INT = 'INT',
    INTEGER = 'INTEGER',
    BIGINT = 'BIGINT',
    DECIMAL = 'DECIMAL',
    NUMERIC = 'NUMERIC',
    FLOAT = 'FLOAT',
    DOUBLE = 'DOUBLE',
    BIT = 'BIT',
    BOOLEAN = 'BOOLEAN',

    // String Types
    CHAR = 'CHAR',
    VARCHAR = 'VARCHAR',
    TINYTEXT = 'TINYTEXT',
    TEXT = 'TEXT',
    MEDIUMTEXT = 'MEDIUMTEXT',
    LONGTEXT = 'LONGTEXT',
    BINARY = 'BINARY',
    VARBINARY = 'VARBINARY',
    TINYBLOB = 'TINYBLOB',
    BLOB = 'BLOB',
    MEDIUMBLOB = 'MEDIUMBLOB',
    LONGBLOB = 'LONGBLOB',
    ENUM = 'ENUM',
    SET = 'SET',

    // Date and Time Types
    DATE = 'DATE',
    DATETIME = 'DATETIME',
    TIMESTAMP = 'TIMESTAMP',
    TIME = 'TIME',
    YEAR = 'YEAR',

    // JSON
    JSON = 'JSON',

    // Spatial Types
    GEOMETRY = 'GEOMETRY',
    POINT = 'POINT',
    LINESTRING = 'LINESTRING',
    POLYGON = 'POLYGON',
    MULTIPOINT = 'MULTIPOINT',
    MULTILINESTRING = 'MULTILINESTRING',
    MULTIPOLYGON = 'MULTIPOLYGON',
    GEOMETRYCOLLECTION = 'GEOMETRYCOLLECTION',
}

export enum PostgreSQLDataType {
    // Numeric Types
    SMALLINT = 'SMALLINT',
    INTEGER = 'INTEGER',
    BIGINT = 'BIGINT',
    DECIMAL = 'DECIMAL',
    NUMERIC = 'NUMERIC',
    REAL = 'REAL',
    DOUBLE_PRECISION = 'DOUBLE PRECISION',
    SMALLSERIAL = 'SMALLSERIAL',
    SERIAL = 'SERIAL',
    BIGSERIAL = 'BIGSERIAL',
    MONEY = 'MONEY',

    // Character Types
    CHAR = 'CHAR',
    VARCHAR = 'VARCHAR',
    TEXT = 'TEXT',

    // Binary Data
    BYTEA = 'BYTEA',

    // Date/Time Types
    DATE = 'DATE',
    TIME = 'TIME',
    TIME_WITH_TIME_ZONE = 'TIME WITH TIME ZONE',
    TIMESTAMP = 'TIMESTAMP',
    TIMESTAMP_WITH_TIME_ZONE = 'TIMESTAMP WITH TIME ZONE',
    INTERVAL = 'INTERVAL',

    // Boolean
    BOOLEAN = 'BOOLEAN',

    // UUID
    UUID = 'UUID',

    // JSON
    JSON = 'JSON',
    JSONB = 'JSONB',

    // Array
    ARRAY = 'ARRAY',

    // Geometric Types
    POINT = 'POINT',
    LINE = 'LINE',
    LSEG = 'LSEG',
    BOX = 'BOX',
    PATH = 'PATH',
    POLYGON = 'POLYGON',
    CIRCLE = 'CIRCLE',

    // Network Addresses
    CIDR = 'CIDR',
    INET = 'INET',
    MACADDR = 'MACADDR',
    MACADDR8 = 'MACADDR8',

    // Full Text Search
    TSVECTOR = 'TSVECTOR',
    TSQUERY = 'TSQUERY',

    // XML
    XML = 'XML',

    // Other
    OID = 'OID',
    NAME = 'NAME',
    ENUM = 'ENUM', // Note: You define ENUM types per table/scope
}
