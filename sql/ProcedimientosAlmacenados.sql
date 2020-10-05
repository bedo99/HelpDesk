    -- PROCEDURES
			-- PROCEDURE REGISTRO
USE `techboys_helpdesk`;
DROP procedure IF EXISTS `registroUsuario`;

DELIMITER $$
USE `techboys_helpdesk`$$
CREATE PROCEDURE `registroUsuario` (
IN Nombre_Usuario VARCHAR(45),
IN _Correo VARCHAR(45),
IN _Contrasena VARCHAR(255),
IN _Telefono VARCHAR(15),
IN _NombreEmpresa VARCHAR(45)
)
BEGIN
DECLARE IDExiste INT; 
SELECT IdUsuario INTO IDExiste FROM usuario WHERE Correo = _Correo;
	IF IDExiste IS NULL THEN 
		INSERT INTO Usuario (NombreUsuario,Correo,Contrasena,Telefono,NombreEmpresa)
		VALUES (Nombre_Usuario, _Correo, _Contrasena, _Telefono, _NombreEmpresa);
	END IF;
END$$

DELIMITER ;

 CALL `techboys_helpdesk`.`registroUsuario`( '1', 'bedo99.cf@gmail.com', '1', '1', '1');
 
/*CON ESTE PROCEDURE PERMITES SABER SI EL USUARIO ESTA REGISTRADO DENTRO DEL SISTEMA DE MESA DE AYUDA*/
DELIMITER $$
USE `techboys_helpdesk`$$
CREATE PROCEDURE `login` (
IN _Correo VARCHAR(45),
IN _Contrasena VARCHAR(255)
)
BEGIN
    SELECT * FROM usuario WHERE Correo = _Correo AND Contrasena = _Contrasena;
END
$$
DELIMITER ;

CALL `techboys_helpdesk`.`login`('bedo99.cf@gmail.com','123456');

/*TE CARGA TODA LA INFORMACION DEL USUARIO POR MEDIO DE SU ID*/
DELIMITER $$
USE `techboys_helpdesk`$$
CREATE PROCEDURE `UsuarioById` (
IN _IdUsuario INT
)
BEGIN
    SELECT * FROM usuario WHERE IdUsuario = _IdUsuario;
END
$$
DELIMITER ;

CALL `techboys_helpdesk`.`UsuarioById`(1);


/*TE CARGA TODA LA INFORMACION DEL TICKET POR MEDIO DE SU ID*/
DELIMITER $$
USE `techboys_helpdesk`$$
CREATE PROCEDURE `TicketBYId` (
IN _IdTicket INT
)
BEGIN
    SELECT * FROM ticket WHERE IdTicket = _IdTicket;
END
$$
DELIMITER ;

CALL `techboys_helpdesk`.`TicketBYId`(3);





/*TE CARGA TODOS LOS TICKETS DEL USUARIO_ESPECIALISTA POR MEDIO DEL ID ESPECIALISTA*/
DELIMITER $$
USE `techboys_helpdesk`$$
CREATE PROCEDURE `AllTicketByUsuarioEspecialista` (
IN _IdUsuario_Especialista INT
)
BEGIN
    SELECT * FROM ticket WHERE IdUsuario_Especialista = _IdUsuario_Especialista;
END
$$
DELIMITER ;

CALL `techboys_helpdesk`.`AllTicketByUsuarioEspecialista`(2);



/*TE CARGA TODOS LOS TICKETS DEL USUARIO_CREADOR POR MEDIO DEL ID CREADOR*/
DELIMITER $$
USE `techboys_helpdesk`$$
CREATE PROCEDURE `AllTicketByUsuarioCreador` (
IN _IdUsuario_Creador INT
)
BEGIN
SELECT * FROM ticket WHERE IdUsuario_Creador = _IdUsuario_Creador;
END
$$
DELIMITER ;

CALL `techboys_helpdesk`.`AllTicketByUsuarioCreador`(1);



/*TE CAMBIA EL ESTATUS DE UN TICKET POR SU ID*/
DELIMITER $$
USE `techboys_helpdesk`$$
CREATE PROCEDURE `CambiarEstatusTicket` (
IN _IdTicket INT
)
BEGIN
DECLARE ESTATUS INT;

UPDATE ticket SET EstatusTicket = EstatusTicket+1 WHERE IdTicket = _IdTicket;
SELECT EstatusTicket INTO ESTATUS FROM ticket WHERE IdTicket = _IdTicket;
	IF ESTATUS = 2 THEN
		UPDATE ticket SET FechaInicioTicket = NOW() WHERE IdTicket = _IdTicket;
	ELSEIF ESTATUS = 6 THEN 
		UPDATE ticket SET FechaTerminadoTicket = NOW() WHERE IdTicket = _IdTicket;
	END IF;
END$$

DELIMITER;

CALL `techboys_helpdesk`.`CambiarEstatusTicket`(5);








/*TE CARGA TODOS LOS TICKETS DE UN SOLO ESTATUS , DEL USUARIO_ESPECIALISTA*/
DELIMITER $$
USE `techboys_helpdesk`$$
CREATE PROCEDURE `AllTicketByEstatusYUsuarioEspecialista` (
IN _IdUsuario_Especialista INT,
IN _EstatusTicket INT
)
BEGIN
SELECT * FROM ticket WHERE IdUsuario_Especialista = _IdUsuario_Especialista AND EstatusTicket = _EstatusTicket;
END
$$
DELIMITER ;

CALL `techboys_helpdesk`.`AllTicketByEstatusYUsuarioEspecialista`(2,2);


/*TE CARGA TODOS LOS TICKETS DE UN SOLO ESTATUS , DEL USUARIO_CREADOR*/
DELIMITER $$
USE `techboys_helpdesk`$$
CREATE PROCEDURE `AllTicketByEstatusYUsuarioCreador` (
IN _IdUsuario_Creador INT,
IN _EstatusTicket INT
)
BEGIN
SELECT * FROM ticket WHERE IdUsuario_Creador = _IdUsuario_Creador AND EstatusTicket = _EstatusTicket;
END
$$
DELIMITER ;

CALL `techboys_helpdesk`.`AllTicketByEstatusYUsuarioCreador`(2,1);
