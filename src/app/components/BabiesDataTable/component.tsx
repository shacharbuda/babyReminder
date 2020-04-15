import React from 'react';
import { Baby } from '../../interfaces';
import BabyDataRowContainer from '../BabyDataRow';
import EditBabyContainer from '../EditBaby';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, withStyles, WithStyles, createStyles, Button, CircularProgress, Link } from '@material-ui/core';
import AddBabyModal from '../AddBabyModal';
import EmptyStateComponent from '../EmptyStateComponent'

interface Props extends WithStyles<typeof styles> {
  babies: Baby[];
  isLoading: boolean;
  isEmpty: boolean;
};

interface State {
  pickedBabyReminder: {
    babyId: number,
    reminderId: number
  } | null;
  addBabyClick: boolean;
}

class BabiesDataTableComponentA extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      pickedBabyReminder: null,
      addBabyClick: false
    };
  }

  onReminderChoose = (reminderId: number, babyId: number) => {
    this.setState({pickedBabyReminder: {
      reminderId,
      babyId
    }});
  }

  addBabyClick = () => this.setState({addBabyClick: true});
  
  render() {
    const { classes, babies, isLoading, isEmpty } = this.props;

    if (isLoading) {
      return <CircularProgress className="m-auto" />
    }

    return (
      <div className="h-100 w-100">
        <TableContainer className={classes.tblContainer}>
            {
              isEmpty ?
              <EmptyStateComponent>
                <h4>אין כאן תינוקות למעקב <span className="font-weight-bold">עדיין</span>...</h4>
                <h5><Link href="#" onClick={this.addBabyClick}>הוסף תינוק</Link> והוא יופיע ממש כאן.</h5>
              </EmptyStateComponent>
              :
          <Table padding="checkbox" stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.head}>שם</TableCell>
                <TableCell align="center" className={classes.head}>תאריך לידה</TableCell>
                <TableCell align="center" className={classes.head}>גן ילדים</TableCell>
                <TableCell align="center" className={classes.head}>תזכורת הבאה</TableCell>
                <TableCell align="center" className={classes.head}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {babies.map((baby) => (
                <BabyDataRowContainer
                  key={`BabyRow_${baby.id}`}
                  baby={baby}
                  onReminderClick={this.onReminderChoose} 
                />
              ))}
            </TableBody>
          </Table>
        }

        </TableContainer>
        <div className={classes.controllers}>
          <Button onClick={this.addBabyClick} variant="outlined">הוסף תינוק</Button>
        </div>
        {
          this.state.pickedBabyReminder &&
          <EditBabyContainer
            isOpen={!!this.state.pickedBabyReminder}
            onClose={() => this.setState({pickedBabyReminder: null})}
            pickedBabyReminder={this.state.pickedBabyReminder} 
          />}
        {
          this.state.addBabyClick &&
          <AddBabyModal
            isOpen={this.state.addBabyClick}
            onClose={() => this.setState({addBabyClick: false})} 
          />
        }
      </div>
    );
  }
}


const CONTROLLERS_HEIGHT = '15%';

const styles = (theme: Theme) => createStyles({
  head: {
    fontWeight: 1000,
    fontSize: '1.2rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.4)'
  },
  tblContainer: {
    position: 'relative',
    width: '100%',
    height: `calc(100% - ${CONTROLLERS_HEIGHT})`,
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  controllers: {
    height: CONTROLLERS_HEIGHT,
    textAlign: 'center',
    paddingTop: '7%'
  }
})

export const BabiesDataTableComponent = withStyles(styles)(BabiesDataTableComponentA);