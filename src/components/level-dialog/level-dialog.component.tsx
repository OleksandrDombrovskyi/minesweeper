import React, {useState} from "react";
import './level-dialog.style.css';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    ListItemIcon,
    Radio,
    RadioGroup,
    Toolbar,
    Typography
} from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import {useDispatch, useSelector} from "react-redux";
import {selectIsLevelDialogOpened} from "../../reducers/game/game.selector";
import {ActionTypes} from "../../actions/actions";

export type GameComplexity = "easy" | "medium" | "hard" | "crazy";
export type GameScale = "small" | "medium" | "big" | "huge";

export interface GameLevel {
    scale: GameScale
    complexity: GameComplexity
}

export const LevelDialog = () => {

    const [scaleValue, setScale] = useState("small");
    const [complexityValue, setComplexity] = useState("easy");

    const handleChangeScale = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScale((event.target as HTMLInputElement).value);
    };

    const handleChangeComplexity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComplexity((event.target as HTMLInputElement).value);
    }

    const dispatch = useDispatch();
    const isLevelDialogOpened = useSelector(selectIsLevelDialogOpened);

    return (
        <Dialog open={isLevelDialogOpened} onClose={() => dispatch({type: ActionTypes.closeLevelDialog})}
                aria-labelledby="form-dialog-title" fullWidth={true}>
            <DialogTitle id="form-dialog-title">
                <Toolbar>
                    <ListItemIcon>
                        <TuneIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="h6">Level</Typography>
                </Toolbar>
            </DialogTitle>
            <DialogContent>
                <div className="dialog_content">
                    <div className="radio_group">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Field scale</FormLabel>
                            <RadioGroup aria-label="scale" name="scale" value={scaleValue} onChange={handleChangeScale}>
                                <FormControlLabel value="small" control={<Radio color="primary"/>} label="Small"/>
                                <FormControlLabel value="medium" control={<Radio color="primary"/>} label="Medium"/>
                                <FormControlLabel value="big" control={<Radio color="primary"/>} label="Big"/>
                                <FormControlLabel value="huge" control={<Radio color="secondary"/>} label="Huge"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="radio_group">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Complexity</FormLabel>
                            <RadioGroup aria-label="complexity" name="complexity" value={complexityValue}
                                        onChange={handleChangeComplexity}>
                                <FormControlLabel value="easy" control={<Radio color="primary"/>} label="Easy"/>
                                <FormControlLabel value="medium" control={<Radio color="primary"/>} label="Medium"/>
                                <FormControlLabel value="hard" control={<Radio color="primary"/>} label="Hard"/>
                                <FormControlLabel value="crazy" control={<Radio color="secondary"/>} label="I'm crazy"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <DialogActions>
                    <Button onClick={() => dispatch({type: ActionTypes.closeLevelDialog})} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => dispatch({
                        type: ActionTypes.changeLevel,
                        payload: {scale: scaleValue, complexity: complexityValue}
                    })} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}