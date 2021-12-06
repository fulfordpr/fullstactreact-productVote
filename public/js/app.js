class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      products: []
    }

  }

  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  //this is really confusing so i need to comment Everything
  //state should be treated as immutable so you have to copy the state
  //property you want to change in order to then set the state property 
  //to the modified copy of itself... therefore mutating state anyways?
  handleProductUpVote = (productId) =>{
    //sets a copy of the products array in state
    const nextProducts = this.state.products.map((product)=>{
      //looping through the new array to see if the product id of the 
      //component that triggered matches any one of the product id's 
      //in the array
      if (product.id === productId){
        //when it finds a match Object.assign() creates a new object 
        //and sets it to the product
        return Object.assign({}, product, {
          //then changes the vote count onb that new object
          //and returns it
          votes: product.votes + 1
        })
      }else{
        //if no match, then just do nothing and return the original object
        return product
      }
    })
    this.setState({
      //sets the products state to be the modified copy of itself
      //but state should be immutable?
      products: nextProducts
    })
  }

  render() {
    const products = this.state.products.sort((a, b) => b.votes - a.votes);
    const productComponents = products.map((product) => (
      <Product
        key={"product-" + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));
    return <div className="ui unstackable items">{productComponents}</div>;
  }
}

class Product extends React.Component {
  constructor(props) {
    super(props);
  }
  handleUpVote = () => {
    this.props.onVote(this.props.id);
  };
  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon" />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img
              className="ui avatar image"
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ProductList />, document.getElementById("content"));
